const math = require('../math.js');

module.exports = function (Type, TYPE_ENUM) {
// All dependent types must have this interface (constructors can differ)
  function DependentType(classname, compatibleTypes) {
    this.classname = classname;
    this.compatibleTypes = compatibleTypes;
  }
  DependentType.prototype.toString = function () {
    throw new Error('DependentType "' + this.classname + '".toString() is not implemented yet!');
  };
  DependentType.prototype.compatible = function (type) {
    for (let i = 0; i < this.compatibleTypes.length; i++) {
      if (type.is(this.compatibleTypes[i])) {
        return true;
      }
    }
    return false;
  };
  DependentType.prototype.copy = function () {
    throw new Error('DependentType "' + this.classname + '".copy() is not implemented yet!');
  };
  DependentType.prototype.conflicts = function (otherDependentType) {
    throw new Error('DependentType "' + this.classname + '".conflicts() is not implemented yet!');
  };
  DependentType.prototype.combine = function (otherDependentType, dependentCombiner) {
    throw new Error('DependentType "' + this.classname + '".combine() is not implemented yet!');
  };

  // Value dependent type: for bools and numbers
  function ValueDependentType(value) {
    DependentType.call(this, 'ValueDependentType', [TYPE_ENUM.NUMBER, TYPE_ENUM.BOOL]);

    if (value == null) {
      throw new Error('ValueDependentType given null parameters!');
    }

    this.value = value;
  }
  ValueDependentType.prototype = Object.create(DependentType.prototype);
  ValueDependentType.prototype.toString = function () {
    const valStr = this.value ? this.value.toString().replace(/\s/g, '') : '';
    return '<value:' + valStr + '>';
  };
  ValueDependentType.prototype.copy = function () {
    return new ValueDependentType(this.value);
  };
  ValueDependentType.prototype.conflicts = function (otherDependentType) {
    return !(otherDependentType instanceof ValueDependentType);
  };
  ValueDependentType.prototype.combine = function (otherDependentType, dependentCombiner) {
    if (!(otherDependentType instanceof ValueDependentType)) {
      throw new Error('Cannot combined ValueDependentType "' + this + '" with un-matching dependent type "' +
        otherDependentType + '"!');
    }

    const combinedValue = dependentCombiner(this.value, otherDependentType.value);
    return new ValueDependentType(combinedValue);
  };

  // length: either constant number or Parameter
  function ArrayDependentType(elementsType, length) {
    DependentType.call(this, 'ArrayDependentType', [TYPE_ENUM.ARRAY]);

    if (elementsType == null || length == null) {
      throw new Error('ArrayDependentType given null parameters!');
    }

    this.elementsType = elementsType;
    this.length = length;
  }
  ArrayDependentType.prototype = Object.create(DependentType.prototype);
  ArrayDependentType.prototype.toString = function () {
    const lenStr = this.length ? this.length.toString().replace(/\s/g, '') : '';
    return '<elementsType:' + this.elementsType.toString() + ',length:' + lenStr + '>';
  };
  ArrayDependentType.prototype.copy = function () {
    return new ArrayDependentType(this.elementsType.copy(), this.length);
  };
  ArrayDependentType.prototype.conflicts = function (otherDependentType) {
    return !(otherDependentType instanceof  ArrayDependentType) ||
      this.elementsType.conflicts(otherDependentType.elementsType);
  };
  ArrayDependentType.prototype.combine = function (otherDependentType, dependentCombiner) {
    if (!(otherDependentType instanceof ArrayDependentType)) {
      throw new Error('Cannot combined ArrayDependentType "' + this + '" with un-matching dependent type "' +
        otherDependentType + '"!');
    }

    const dependentDataType = this.elementsType.combine(otherDependentType.elementsType, dependentCombiner);
    const combinedLength = dependentCombiner(this.length, otherDependentType.length);
    return new ArrayDependentType(dependentDataType, combinedLength);
  };

  // start, end, and increment
  function RangeDependentType(startType, endType, incrementType, size) {
    DependentType.call(this, 'RangeDependentType', [TYPE_ENUM.RANGE]);

    if (startType == null || endType == null || incrementType == null || size == null) {
      throw new Error('RangeDependentType given null parameters!');
    }
    if (startType.secret || endType.secret || incrementType.secret) {
      throw new Error('RangeDependentType given secret parameters!');
    }

    this.startType = startType;
    this.endType = endType;
    this.incrementType = incrementType;
    this.size = size;
  }
  RangeDependentType.prototype = Object.create(DependentType.prototype);
  RangeDependentType.prototype.toString = function () {
    return '<start:' + this.startType.toString() + ',end:' + this.endType.toString() +
      ',increment:' + this.incrementType.toString() + ',size:' + this.size + '>';
  };
  RangeDependentType.prototype.copy = function () {
    return new RangeDependentType(this.startType.copy(), this.endType.copy(), this.incrementType.copy(), this.size);
  };
  RangeDependentType.prototype.conflicts = function (otherDependentType) {
    return !(otherDependentType instanceof  RangeDependentType) ||
      this.startType.conflicts(otherDependentType.startType) ||
      this.endType.conflicts(otherDependentType.endType) ||
      this.incrementType.conflicts(otherDependentType.incrementType);
  };
  RangeDependentType.prototype.combine = function (otherDependentType, dependentCombiner) {
    if (!(otherDependentType instanceof RangeDependentType)) {
      throw new Error('Cannot combined RangeDependentType "' + this + '" with un-matching dependent type "' +
        otherDependentType + '"!');
    }
    return new RangeDependentType(
      this.startType.combine(otherDependentType.startType, dependentCombiner),
      this.endType.combine(otherDependentType.endType, dependentCombiner),
      this.incrementType.combine(otherDependentType.incrementType, dependentCombiner),
      dependentCombiner(this.size, otherDependentType.size)
    );
  };
  RangeDependentType.prototype.accurateEnd = function () {
    // returns a symbolic expression representing the first element visited while expanding this range that is >= end
    // for example [0:10:1] => 10
    //             [3,10,2] => 11
    let end = this.endType.dependentType.value;
    if (this.incrementType.dependentType.value.toString() !== '1') {
      end = math.multiply(this.size, this.incrementType.dependentType.value.toString());
      end = math.add(this.startType.dependentType.value, end);
    }
    return end;
  };

  // Function type signature
  // thisType can be null when this is not a method
  function FunctionDependentType(thisType, parameterTypes, returnType) {
    DependentType.call(this, 'FunctionDependentType', [TYPE_ENUM.FUNCTION]);
    this.thisType = thisType;
    this.parameterTypes = parameterTypes;
    this.returnType = returnType;

    if (this.parameterTypes == null || this.returnType == null) {
      throw new Error('FunctionDependentType given null parameters!');
    }
  }
  FunctionDependentType.prototype = Object.create(DependentType.prototype);
  FunctionDependentType.prototype.toString = function () {
    const thisType = this.thisType != null ? this.thisType.toString() : '';
    const params = this.parameterTypes.map(function (parameterType) {
      return parameterType.toString();
    });
    return '<' + thisType + '(' + params.join(',') + ')=>' + this.returnType.toString() + '>';
  };
  FunctionDependentType.prototype.copy = function () {
    const copyThisType = this.thisType ? this.thisType.copy() : null;
    const copyParameterTypes = this.parameterTypes.map(function (parameterType) {
      return parameterType.copy();
    }) ;
    const copyReturnType = this.returnType.copy();
    return new FunctionDependentType(copyThisType, copyParameterTypes, copyReturnType);
  };
  FunctionDependentType.prototype.conflicts = function (otherDependentType) {
    if (!(otherDependentType instanceof FunctionDependentType)) {
      return true;
    }
    if (this.thisType != null && (otherDependentType.thisType == null || this.thisType.conflicts(otherDependentType.thisType))) {
      return true;
    }
    if (this.returnType.conflicts(otherDependentType.returnType)) {
      return true;
    }
    if (this.parameterTypes.length !== otherDependentType.parameterTypes.length) {
      return true;
    }
    for (let i = 0; i < this.parameterTypes.length; i++) {
      if (this.parameterTypes[i].conflicts(otherDependentType.parameterTypes[i])) {
        return true;
      }
    }
    return false;
  };
  FunctionDependentType.prototype.combine = function () {
    throw new Error('FunctionDependentType does not support .combine()!');
  };

  return {
    ArrayDependentType: ArrayDependentType,
    ValueDependentType: ValueDependentType,
    RangeDependentType: RangeDependentType,
    FunctionDependentType: FunctionDependentType,
  };
};