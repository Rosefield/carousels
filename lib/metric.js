var find_Scope = function(p){ // TODO: fix scoping problems with arrays
  var scope = p.scope;
  while(scope.block.id == undefined){
    scope = scope.parent;
  }
  return scope.block.id.name;
}



var createMetric = function(spec) {

  var dict = {}; // acts as a stack
  dict["arrays"] = [];

  return function () {
    var zero = polynomium.c(0).toObject(), //create constant polynomium = 0
        one = polynomium.c(1).toObject(), //create constant polynomium = 1
        plus = function (sum, node) { return polynomium.add(sum, node.metric).toObject(); },
        dot = function (mult, node) { return polynomium.mul(mult, node.metric).toObject(); }
        ;

    return carousels.babelVisitorDefaults({
      visitor: {
        Program: {
          "exit": function (p) {

            var results = {}, metric = {};
            for (var i = 0; i < p.node.body.length; i++) {
              metric[p.node.body[i].id.name] = p.node.body[i].metric;
              results[p.node.body[i].id.name] = polynomium.toString(p.node.body[i].metric);
            }
            p.node.metric = metric;
            p.node.results = results;
          }
        },
        ExpressionStatement: {
          "exit": function (p) {
            p.node.metric = p.node.expression.metric;
          }
        },
        CallExpression: {
          "exit": function (p) {
            var op_name =  (p.node.callee.property != undefined)?  p.node.callee.property.name : p.node.callee.name ;
            var parent_type = p.parent.type;
            var scope = find_Scope(p);


            if(op_name == "map" || op_name == "reduce"){
              var arg = (p.node.arguments[0].type == "Identifier")? dict[scope+ ": "+p.node.arguments[0].name]: p.node.arguments[0];
              var func = (p.node.arguments[1].type == "Identifier")?  dict[p.node.arguments[1].name]: p.node.arguments[1];
              var arr_length = (op_name == "map") ? arg.elements.length : arg.elements.length - 1;

              p.node.metric = polynomium.add(dot(polynomium.c(arr_length).toObject(), func), arg.metric).toObject();
            }else if (op_name in spec) {
              var arguments = p.node.arguments;
              p.node.metric = arguments.reduce(plus, spec[op_name]);
            }else {
              throw Error("Node type CallExpression with operator " + op_name +
                          " is not handled at line " + start.line + ", column " + start.column + ".");
            }

          }
        },
        MemberExpression:{
          "exit": function (p) {
            if(p.container.arguments != undefined){
              caller_object = p.node.object;
              arguments = p.container.arguments;
              arguments.unshift(caller_object);
            }else{ // if the MemberExpression is not a function call
              p.node.metric = 0;
            }

          }
        },
        UpdateExpression: {
          "exit": function(p){
            p.node.metric = zero;
          }
        },
        ArrowFunctionExpression: {
          "exit": function(p){
            var op_name = p.node.body.callee.property.name;
            p.node.metric = p.container[1].body.metric;
          }
        },
        AssignmentExpression: {
          "exit": function(p){
            p.node.metric = p.node.right.metric;
          }
        },
        IfStatement: { // WARNING: OVERESTIMATE Cost = Cost_IF + Cost_Else
          "exit": function(p){
            var else_branch = p.node.alternate;
            var if_branch = p.node.consequent;
            p.node.metric = polynomium.add(if_branch.metric, else_branch.metric).toObject();
          }
        },
        FunctionDeclaration: {
          "exit": function (p) {
            p.node.metric = p.node.body.metric;
            dict[p.node.id.name] = p.node;
          }
        },
        FunctionExpression: {
          "exit": function (p) {
            p.node.metric = p.node.body.metric;
            dict[p.node.id.name] = p.node;
          }
        },
        ArrayExpression: { // TODO: fix issue with arrays defined in anonymous functions being added to primary function stack
          "exit": function (p) {
            var arr = p.node.elements;
            var scope = p.scope.block.id.name;

            p.node.metric = arr.reduce(plus);
            if(p.container.id!= undefined){
              dict[scope+ ": "+p.container.id.name]= p.node;
            }
          }
        },
        Identifier: {
          "exit": function (p) {
            p.node.metric = zero;
          }
        },
        BlockStatement: {
          "exit": function (p) {
            p.node.metric = p.node.body.reduce(plus, zero);
          }
        },
        VariableDeclaration: {
          "exit": function (p) {
            p.node.metric = p.node.declarations.reduce(plus, zero);
          }
        },
        VariableDeclarator: {
          "exit": function (p) {
            p.node.metric = p.node.init.metric;
          }
        },
        ReturnStatement: {
          "exit": function (p) {
            p.node.metric = p.node.argument.metric;
          }
        },
        BinaryExpression: {
          "exit": function (p) {
            var start = p.node.loc.start, op = p.node.operator;
            if (op in spec) {
              p.node.metric = [p.node.left, p.node.right].reduce(plus, spec[op]);
            } else {
              throw Error("Node type BinaryExpression with operator " + op +
                          " is not handled at line " + start.line + ", column " + start.column + ".");
            }
          }
        },
        NumericLiteral: {
          "exit": function (p) {
            p.node.metric = zero;
          }
        }
      }
    });
  };
}