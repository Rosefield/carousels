(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.carousels = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports=[
  {
    "nodeType": "FunctionDefinition",
    "name": {
      "nodeType": "NameExpression",
      "name": "merge_sort_dedup"
    },
    "parameters": [
      {
        "nodeType": "VariableDefinition",
        "name": {
          "nodeType": "NameExpression",
          "name": "a"
        },
        "type": {
          "nodeType": "TypeNode",
          "secret": true,
          "type": "array"
        }
      }
    ],
    "returnType": {
      "nodeType": "TypeNode",
      "secret": true,
      "type": "array"
    },
    "body": [
      {
        "nodeType": "VariableDefinition",
        "name": {
          "nodeType": "NameExpression",
          "name": "n"
        },
        "type": {
          "nodeType": "TypeNode",
          "secret": false,
          "type": "number"
        }
      },
      {
        "nodeType": "VariableAssignment",
        "name": {
          "nodeType": "NameExpression",
          "name": "n"
        },
        "expression": {
          "nodeType": "FunctionCall",
          "function": {
            "nodeType": "DotExpression",
            "left": "a",
            "right": "len"
          },
          "parameters": []
        }
      },
      {
        "nodeType": "If",
        "condition": {
          "nodeType": "DirectExpression",
          "operator": ">",
          "arity": 2,
          "operands": [
            {
              "nodeType": "NameExpression",
              "name": "n"
            },
            {
              "nodeType": "LiteralExpression",
              "value": 1
            }
          ]
        },
        "ifBody": [
          {
            "nodeType": "VariableDefinition",
            "name": {
              "nodeType": "NameExpression",
              "name": "m"
            },
            "type": {
              "nodeType": "TypeNode",
              "secret": false,
              "type": "number"
            }
          },
          {
            "nodeType": "VariableAssignment",
            "name": {
              "nodeType": "NameExpression",
              "name": "m"
            },
            "expression": {
              "nodeType": "DirectExpression",
              "operator": "/",
              "arity": 2,
              "operands": [
                {
                  "nodeType": "NameExpression",
                  "name": "n"
                },
                {
                  "nodeType": "LiteralExpression",
                  "value": 2
                }
              ]
            }
          },
          {
            "nodeType": "FunctionCall",
            "function": {
              "nodeType": "NameExpression",
              "name": "merge_dedup"
            },
            "parameters": [
              {
                "nodeType": "FunctionCall",
                "function": {
                  "nodeType": "NameExpression",
                  "name": "merge_sort_dedup"
                },
                "parameters": [
                  {
                    "nodeType": "SliceExpression",
                    "array": {
                      "nodeType": "NameExpression",
                      "name": "a"
                    },
                    "range": {
                      "nodeType": "RangeExpression",
                      "start": {
                        "type": "LiteralExpression",
                        "value": 0
                      },
                      "end": {
                        "type": "NameExpression",
                        "name": "m"
                      }
                    }
                  }
                ]
              },
              {
                "nodeType": "FunctionCall",
                "function": {
                  "nodeType": "NameExpression",
                  "name": "merge_sort_dedup"
                },
                "parameters": [
                  {
                    "nodeType": "SliceExpression",
                    "array": {
                      "nodeType": "NameExpression",
                      "name": "a"
                    },
                    "range": {
                      "nodeType": "RangeExpression",
                      "start": {
                        "nodeType": "NameExpression",
                        "name": "m"
                      },
                      "end": {
                        "nodeType": "NameExpression",
                        "name": "n"
                      }
                    }
                  }
                ]
              }
            ]
          }
        ],
        "elseBody": [
          {
            "nodeType": "FunctionCall",
            "function": {
              "nodeType": "DotExpression",
              "left": {
                "nodeType": "NameExpression",
                "name": "a"
              },
              "right": {
                "nodeType": "NameExpression",
                "name": "to_owned"
              }
            },
            "parameters": []
          }
        ]
      }
    ]
  },
  {
    "nodeType": "FunctionDefinition",
    "name": "merge_dedup",
    "parameters": [
      {
        "nodeType": "VariableDefinition",
        "name": "a",
        "type": {
          "nodeType": "TypeNode",
          "secret": true,
          "type": "array"
        }
      },
      {
        "nodeType": "VariableDefinition",
        "name": "b",
        "type": {
          "nodeType": "TypeNode",
          "secret": true,
          "type": "array"
        }
      }
    ],
    "returnType": {
      "nodeType": "TypeNode",
      "secret": true,
      "type": "array"
    },
    "body": [
    ]
  }
]

},{}],2:[function(require,module,exports){
const IRVisitor = require('../ir/visitor.js');
const visitorImplementations = [
  require('./visitors/array.js'),
  require('./visitors/expression.js'),
  require('./visitors/for.js'),
  require('./visitors/function.js'),
  require('./visitors/if.js'),
  require('./visitors/oblivIf.js'),
  require('./visitors/value.js'),
  require('./visitors/variable.js')
];

const analyze = function (IR, costs) {
  const visitor = new IRVisitor(IR);
  for (let i = 0; i < visitorImplementations.length; i++) {
    visitor.addVisitors(visitorImplementations[i]);
  }
  visitor.start();

  return 'b*2';
};

module.exports = analyze;
},{"../ir/visitor.js":18,"./visitors/array.js":3,"./visitors/expression.js":4,"./visitors/for.js":5,"./visitors/function.js":6,"./visitors/if.js":7,"./visitors/oblivIf.js":8,"./visitors/value.js":9,"./visitors/variable.js":10}],3:[function(require,module,exports){
const ArrayAccess = function (node, args) {};
const SliceExpression  = function (node, args) {};

module.exports = {
  ArrayAccess: ArrayAccess,
  SliceExpression: SliceExpression
};
},{}],4:[function(require,module,exports){
const ParenthesesExpression = function (node, args) {};
const DirectExpression = function (node, args) {};
const DotExpression = function (node, args) {};
const NameExpression = function (node, args) {};

module.exports = {
  ParenthesesExpression: ParenthesesExpression,
  DirectExpression: DirectExpression,
  DotExpression: DotExpression,
  NameExpression: NameExpression
};
},{}],5:[function(require,module,exports){
const ForEach = function (node, args) {};
const For = function (node, args) {};

module.exports = {
  For: For,
  ForEach: ForEach
};
},{}],6:[function(require,module,exports){
const FunctionDefinition = function (node, args) {};

const ReturnStatement = function (node, args) {};

const FunctionCall = function (node, args) {};

module.exports = {
  FunctionDefinition: FunctionDefinition,
  ReturnStatement: ReturnStatement,
  FunctionCall: FunctionCall
};
},{}],7:[function(require,module,exports){
const If = function (node, args) {};

module.exports = {
  If: If
};
},{}],8:[function(require,module,exports){
const OblivIf = function (node, args) {};

module.exports = {
  OblivIf: OblivIf
};
},{}],9:[function(require,module,exports){
const ArrayExpression = function (node, args) {};
const RangeExpression = function (node, args) {};
const LiteralExpression = function (node, args) {};

module.exports = {
  ArrayExpression: ArrayExpression,
  RangeExpression: RangeExpression,
  LiteralExpression: LiteralExpression
};
},{}],10:[function(require,module,exports){
const TypeNode = function (node, args) {};
const VariableDefinition = function (node, args) {};
const VariableAssignment = function (node, args) {};

module.exports = {
  TypeNode: TypeNode,
  VariableDefinition: VariableDefinition,
  VariableAssignment: VariableAssignment
};
},{}],11:[function(require,module,exports){
const jiff = require('./jiff.json');
const rustBGW = require('./rustBGW.json');

module.exports = {
  jiff: jiff,
  rustBGW: rustBGW
};
},{"./jiff.json":12,"./rustBGW.json":13}],12:[function(require,module,exports){
module.exports={
  "parameters": [
    {"parameter": "p", "description": "number of parties"},
    {"parameter": "b", "description": "number of bits in field"}
  ],
  "metrics": [
    "Online Messages",
    "Online Rounds"
  ],
  "operations": [
    {
      "rule": {
        "nodeType": "FunctionCall",
        "match": "^jiffClient\\.share(@P)$"
      },
      "cost": "p-1"
    },
    {
      "rule": {
        "nodeType": "FunctionCall",
        "match": "^<type:number,secret:true>\\.smult(<type:number,secret:true>@P)$"
      },
      "cost": "p-1"
    }
  ]
}
},{}],13:[function(require,module,exports){
module.exports={
  "parameters": [
    {"parameter": "p", "description": "number of parties"},
    {"parameter": "b", "description": "number of bits in field"}
  ],
  "metrics": [
    "Online Messages",
    "Online Rounds"
  ],
  "operations": [
    {
      "rule": {
        "nodeType": "DirectExpression",
        "match": "^<type:number,secret:true>\\+<type:number,secret:true>$"
      },
      "cost": {
        "Online Messages": "0",
        "Online Rounds": "0"
      }
    },
    {
      "rule": {
        "nodeType": "DirectExpression",
        "match": "^<type:number,secret:true>\\*<type:number,secret:true>$"
      },
      "cost": {
        "Online Messages": "p-1",
        "Online Rounds": "1"
      }
    },
    {
      "rule": {
        "nodeType": "DirectExpression",
        "match": "^<type:number,secret:true><<type:number,secret:true>$"
      },
      "cost": {
        "Online Messages": "b*(p-1)",
        "Online Rounds": "b-1"
      }
    }
  ]
}
},{}],14:[function(require,module,exports){
const costs = require('./costs/index.js');
const parsers = require('./ir/parsers.js');
const analyze = require('./analyze/analyze.js');

module.exports = {
  costs: costs,
  parsers: parsers,
  analyze: analyze
};
},{"./analyze/analyze.js":2,"./costs/index.js":11,"./ir/parsers.js":16}],15:[function(require,module,exports){
const parseJavascript = function (code) {
  return {};
};

module.exports = parseJavascript;
},{}],16:[function(require,module,exports){
const rust = require('./rust.js');
const javascript = require('./javascript.js');

module.exports = {
  rust: rust,
  javascript: javascript
};
},{"./javascript.js":15,"./rust.js":17}],17:[function(require,module,exports){
const IR = require('../../docs/merge_sort_dedup_ir.json');
// TODO: require wasm bundle from rust/dist/bundle.js and use it to parse into IR
const parseRust = function (code) {
  return IR;
};

module.exports = parseRust;
},{"../../docs/merge_sort_dedup_ir.json":1}],18:[function(require,module,exports){
// All node types that can be visited
const IR_NODES = [
  // logical nodes
  'TypeNode',
  // statements
  'FunctionDefinition',
  'ReturnStatement',
  'VariableDefinition',
  'ForEach',
  'For',
  'VariableAssignment',
  // expressions
  'If',
  'OblivIf',
  'LiteralExpression',
  'NameExpression',
  'DirectExpression',
  'ParenthesesExpression',
  'ArrayAccess',
  'RangeExpression',
  'SliceExpression',
  'ArrayExpression',
  'FunctionCall',
  'DotExpression'
];

// The visitor class
function IRVisitor(IR) {
  this.IR = IR;
}

// Start visiting
IRVisitor.prototype.start = function (args) {
  this.visit(this.IR, args);
};

IRVisitor.prototype.visit = function (node, args) {
  if (node == null || node.nodeType == null) {
    return args;
  }

  return this['visit'+node.nodeType](node, args);
};

IRVisitor.prototype.addVisitor = function (nodeType, visitorFunction) {
  if (IR_NODES.indexOf(nodeType) === -1) {
    throw new Error('Attempted to add visitor for illegal node type "' + nodeType + '"!');
  }

  this['visit'+nodeType] = visitorFunction.bind(this);
};

IRVisitor.prototype.addVisitors = function (visitorsMap) {
  for (let nodeType in visitorsMap) {
    if (Object.prototype.hasOwnProperty.call(visitorsMap, nodeType)) {
      this.addVisitor(nodeType, visitorsMap[nodeType]);
    }
  }
};

// Default visitor used for node types for which a user visitor was not set
const defaultVisitor = function (nodeType, node, args) {
  console.log('Warning: visitor function for', nodeType, 'is undefined!');
  return args;
};
for (let i = 0; i < IR_NODES.length; i++) {
  const nodeType = IR_NODES[i];
  IRVisitor.prototype['visit'+nodeType] = defaultVisitor.bind(null, nodeType);
}

module.exports = IRVisitor;
},{}]},{},[14])(14)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkb2NzL21lcmdlX3NvcnRfZGVkdXBfaXIuanNvbiIsInNyYy9hbmFseXplL2FuYWx5emUuanMiLCJzcmMvYW5hbHl6ZS92aXNpdG9ycy9hcnJheS5qcyIsInNyYy9hbmFseXplL3Zpc2l0b3JzL2V4cHJlc3Npb24uanMiLCJzcmMvYW5hbHl6ZS92aXNpdG9ycy9mb3IuanMiLCJzcmMvYW5hbHl6ZS92aXNpdG9ycy9mdW5jdGlvbi5qcyIsInNyYy9hbmFseXplL3Zpc2l0b3JzL2lmLmpzIiwic3JjL2FuYWx5emUvdmlzaXRvcnMvb2JsaXZJZi5qcyIsInNyYy9hbmFseXplL3Zpc2l0b3JzL3ZhbHVlLmpzIiwic3JjL2FuYWx5emUvdmlzaXRvcnMvdmFyaWFibGUuanMiLCJzcmMvY29zdHMvaW5kZXguanMiLCJzcmMvY29zdHMvamlmZi5qc29uIiwic3JjL2Nvc3RzL3J1c3RCR1cuanNvbiIsInNyYy9pbmRleC5qcyIsInNyYy9pci9qYXZhc2NyaXB0LmpzIiwic3JjL2lyL3BhcnNlcnMuanMiLCJzcmMvaXIvcnVzdC5qcyIsInNyYy9pci92aXNpdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIm1vZHVsZS5leHBvcnRzPVtcbiAge1xuICAgIFwibm9kZVR5cGVcIjogXCJGdW5jdGlvbkRlZmluaXRpb25cIixcbiAgICBcIm5hbWVcIjoge1xuICAgICAgXCJub2RlVHlwZVwiOiBcIk5hbWVFeHByZXNzaW9uXCIsXG4gICAgICBcIm5hbWVcIjogXCJtZXJnZV9zb3J0X2RlZHVwXCJcbiAgICB9LFxuICAgIFwicGFyYW1ldGVyc1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwibm9kZVR5cGVcIjogXCJWYXJpYWJsZURlZmluaXRpb25cIixcbiAgICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiTmFtZUV4cHJlc3Npb25cIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJhXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiVHlwZU5vZGVcIixcbiAgICAgICAgICBcInNlY3JldFwiOiB0cnVlLFxuICAgICAgICAgIFwidHlwZVwiOiBcImFycmF5XCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF0sXG4gICAgXCJyZXR1cm5UeXBlXCI6IHtcbiAgICAgIFwibm9kZVR5cGVcIjogXCJUeXBlTm9kZVwiLFxuICAgICAgXCJzZWNyZXRcIjogdHJ1ZSxcbiAgICAgIFwidHlwZVwiOiBcImFycmF5XCJcbiAgICB9LFxuICAgIFwiYm9keVwiOiBbXG4gICAgICB7XG4gICAgICAgIFwibm9kZVR5cGVcIjogXCJWYXJpYWJsZURlZmluaXRpb25cIixcbiAgICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiTmFtZUV4cHJlc3Npb25cIixcbiAgICAgICAgICBcIm5hbWVcIjogXCJuXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiVHlwZU5vZGVcIixcbiAgICAgICAgICBcInNlY3JldFwiOiBmYWxzZSxcbiAgICAgICAgICBcInR5cGVcIjogXCJudW1iZXJcIlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcIm5vZGVUeXBlXCI6IFwiVmFyaWFibGVBc3NpZ25tZW50XCIsXG4gICAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgICAgXCJub2RlVHlwZVwiOiBcIk5hbWVFeHByZXNzaW9uXCIsXG4gICAgICAgICAgXCJuYW1lXCI6IFwiblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiZXhwcmVzc2lvblwiOiB7XG4gICAgICAgICAgXCJub2RlVHlwZVwiOiBcIkZ1bmN0aW9uQ2FsbFwiLFxuICAgICAgICAgIFwiZnVuY3Rpb25cIjoge1xuICAgICAgICAgICAgXCJub2RlVHlwZVwiOiBcIkRvdEV4cHJlc3Npb25cIixcbiAgICAgICAgICAgIFwibGVmdFwiOiBcImFcIixcbiAgICAgICAgICAgIFwicmlnaHRcIjogXCJsZW5cIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJwYXJhbWV0ZXJzXCI6IFtdXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwibm9kZVR5cGVcIjogXCJJZlwiLFxuICAgICAgICBcImNvbmRpdGlvblwiOiB7XG4gICAgICAgICAgXCJub2RlVHlwZVwiOiBcIkRpcmVjdEV4cHJlc3Npb25cIixcbiAgICAgICAgICBcIm9wZXJhdG9yXCI6IFwiPlwiLFxuICAgICAgICAgIFwiYXJpdHlcIjogMixcbiAgICAgICAgICBcIm9wZXJhbmRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJub2RlVHlwZVwiOiBcIk5hbWVFeHByZXNzaW9uXCIsXG4gICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJub2RlVHlwZVwiOiBcIkxpdGVyYWxFeHByZXNzaW9uXCIsXG4gICAgICAgICAgICAgIFwidmFsdWVcIjogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJpZkJvZHlcIjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibm9kZVR5cGVcIjogXCJWYXJpYWJsZURlZmluaXRpb25cIixcbiAgICAgICAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgICAgICAgIFwibm9kZVR5cGVcIjogXCJOYW1lRXhwcmVzc2lvblwiLFxuICAgICAgICAgICAgICBcIm5hbWVcIjogXCJtXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInR5cGVcIjoge1xuICAgICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiVHlwZU5vZGVcIixcbiAgICAgICAgICAgICAgXCJzZWNyZXRcIjogZmFsc2UsXG4gICAgICAgICAgICAgIFwidHlwZVwiOiBcIm51bWJlclwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiVmFyaWFibGVBc3NpZ25tZW50XCIsXG4gICAgICAgICAgICBcIm5hbWVcIjoge1xuICAgICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiTmFtZUV4cHJlc3Npb25cIixcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJleHByZXNzaW9uXCI6IHtcbiAgICAgICAgICAgICAgXCJub2RlVHlwZVwiOiBcIkRpcmVjdEV4cHJlc3Npb25cIixcbiAgICAgICAgICAgICAgXCJvcGVyYXRvclwiOiBcIi9cIixcbiAgICAgICAgICAgICAgXCJhcml0eVwiOiAyLFxuICAgICAgICAgICAgICBcIm9wZXJhbmRzXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiTmFtZUV4cHJlc3Npb25cIixcbiAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm5cIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJub2RlVHlwZVwiOiBcIkxpdGVyYWxFeHByZXNzaW9uXCIsXG4gICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibm9kZVR5cGVcIjogXCJGdW5jdGlvbkNhbGxcIixcbiAgICAgICAgICAgIFwiZnVuY3Rpb25cIjoge1xuICAgICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiTmFtZUV4cHJlc3Npb25cIixcbiAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibWVyZ2VfZGVkdXBcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicGFyYW1ldGVyc1wiOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiRnVuY3Rpb25DYWxsXCIsXG4gICAgICAgICAgICAgICAgXCJmdW5jdGlvblwiOiB7XG4gICAgICAgICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiTmFtZUV4cHJlc3Npb25cIixcbiAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm1lcmdlX3NvcnRfZGVkdXBcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXCJwYXJhbWV0ZXJzXCI6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgXCJub2RlVHlwZVwiOiBcIlNsaWNlRXhwcmVzc2lvblwiLFxuICAgICAgICAgICAgICAgICAgICBcImFycmF5XCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiTmFtZUV4cHJlc3Npb25cIixcbiAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJhXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXCJyYW5nZVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJub2RlVHlwZVwiOiBcIlJhbmdlRXhwcmVzc2lvblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwic3RhcnRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiTGl0ZXJhbEV4cHJlc3Npb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogMFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJlbmRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0eXBlXCI6IFwiTmFtZUV4cHJlc3Npb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm1cIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibm9kZVR5cGVcIjogXCJGdW5jdGlvbkNhbGxcIixcbiAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCI6IHtcbiAgICAgICAgICAgICAgICAgIFwibm9kZVR5cGVcIjogXCJOYW1lRXhwcmVzc2lvblwiLFxuICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibWVyZ2Vfc29ydF9kZWR1cFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBcInBhcmFtZXRlcnNcIjogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiU2xpY2VFeHByZXNzaW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYXJyYXlcIjoge1xuICAgICAgICAgICAgICAgICAgICAgIFwibm9kZVR5cGVcIjogXCJOYW1lRXhwcmVzc2lvblwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImFcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcInJhbmdlXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiUmFuZ2VFeHByZXNzaW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdGFydFwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiTmFtZUV4cHJlc3Npb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm1cIlxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXCJlbmRcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJub2RlVHlwZVwiOiBcIk5hbWVFeHByZXNzaW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJuXCJcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiZWxzZUJvZHlcIjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIFwibm9kZVR5cGVcIjogXCJGdW5jdGlvbkNhbGxcIixcbiAgICAgICAgICAgIFwiZnVuY3Rpb25cIjoge1xuICAgICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiRG90RXhwcmVzc2lvblwiLFxuICAgICAgICAgICAgICBcImxlZnRcIjoge1xuICAgICAgICAgICAgICAgIFwibm9kZVR5cGVcIjogXCJOYW1lRXhwcmVzc2lvblwiLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImFcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBcInJpZ2h0XCI6IHtcbiAgICAgICAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiTmFtZUV4cHJlc3Npb25cIixcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ0b19vd25lZFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBhcmFtZXRlcnNcIjogW11cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcIm5vZGVUeXBlXCI6IFwiRnVuY3Rpb25EZWZpbml0aW9uXCIsXG4gICAgXCJuYW1lXCI6IFwibWVyZ2VfZGVkdXBcIixcbiAgICBcInBhcmFtZXRlcnNcIjogW1xuICAgICAge1xuICAgICAgICBcIm5vZGVUeXBlXCI6IFwiVmFyaWFibGVEZWZpbml0aW9uXCIsXG4gICAgICAgIFwibmFtZVwiOiBcImFcIixcbiAgICAgICAgXCJ0eXBlXCI6IHtcbiAgICAgICAgICBcIm5vZGVUeXBlXCI6IFwiVHlwZU5vZGVcIixcbiAgICAgICAgICBcInNlY3JldFwiOiB0cnVlLFxuICAgICAgICAgIFwidHlwZVwiOiBcImFycmF5XCJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJub2RlVHlwZVwiOiBcIlZhcmlhYmxlRGVmaW5pdGlvblwiLFxuICAgICAgICBcIm5hbWVcIjogXCJiXCIsXG4gICAgICAgIFwidHlwZVwiOiB7XG4gICAgICAgICAgXCJub2RlVHlwZVwiOiBcIlR5cGVOb2RlXCIsXG4gICAgICAgICAgXCJzZWNyZXRcIjogdHJ1ZSxcbiAgICAgICAgICBcInR5cGVcIjogXCJhcnJheVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdLFxuICAgIFwicmV0dXJuVHlwZVwiOiB7XG4gICAgICBcIm5vZGVUeXBlXCI6IFwiVHlwZU5vZGVcIixcbiAgICAgIFwic2VjcmV0XCI6IHRydWUsXG4gICAgICBcInR5cGVcIjogXCJhcnJheVwiXG4gICAgfSxcbiAgICBcImJvZHlcIjogW1xuICAgIF1cbiAgfVxuXVxuIiwiY29uc3QgSVJWaXNpdG9yID0gcmVxdWlyZSgnLi4vaXIvdmlzaXRvci5qcycpO1xuY29uc3QgdmlzaXRvckltcGxlbWVudGF0aW9ucyA9IFtcbiAgcmVxdWlyZSgnLi92aXNpdG9ycy9hcnJheS5qcycpLFxuICByZXF1aXJlKCcuL3Zpc2l0b3JzL2V4cHJlc3Npb24uanMnKSxcbiAgcmVxdWlyZSgnLi92aXNpdG9ycy9mb3IuanMnKSxcbiAgcmVxdWlyZSgnLi92aXNpdG9ycy9mdW5jdGlvbi5qcycpLFxuICByZXF1aXJlKCcuL3Zpc2l0b3JzL2lmLmpzJyksXG4gIHJlcXVpcmUoJy4vdmlzaXRvcnMvb2JsaXZJZi5qcycpLFxuICByZXF1aXJlKCcuL3Zpc2l0b3JzL3ZhbHVlLmpzJyksXG4gIHJlcXVpcmUoJy4vdmlzaXRvcnMvdmFyaWFibGUuanMnKVxuXTtcblxuY29uc3QgYW5hbHl6ZSA9IGZ1bmN0aW9uIChJUiwgY29zdHMpIHtcbiAgY29uc3QgdmlzaXRvciA9IG5ldyBJUlZpc2l0b3IoSVIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHZpc2l0b3JJbXBsZW1lbnRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2aXNpdG9yLmFkZFZpc2l0b3JzKHZpc2l0b3JJbXBsZW1lbnRhdGlvbnNbaV0pO1xuICB9XG4gIHZpc2l0b3Iuc3RhcnQoKTtcblxuICByZXR1cm4gJ2IqMic7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFuYWx5emU7IiwiY29uc3QgQXJyYXlBY2Nlc3MgPSBmdW5jdGlvbiAobm9kZSwgYXJncykge307XG5jb25zdCBTbGljZUV4cHJlc3Npb24gID0gZnVuY3Rpb24gKG5vZGUsIGFyZ3MpIHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQXJyYXlBY2Nlc3M6IEFycmF5QWNjZXNzLFxuICBTbGljZUV4cHJlc3Npb246IFNsaWNlRXhwcmVzc2lvblxufTsiLCJjb25zdCBQYXJlbnRoZXNlc0V4cHJlc3Npb24gPSBmdW5jdGlvbiAobm9kZSwgYXJncykge307XG5jb25zdCBEaXJlY3RFeHByZXNzaW9uID0gZnVuY3Rpb24gKG5vZGUsIGFyZ3MpIHt9O1xuY29uc3QgRG90RXhwcmVzc2lvbiA9IGZ1bmN0aW9uIChub2RlLCBhcmdzKSB7fTtcbmNvbnN0IE5hbWVFeHByZXNzaW9uID0gZnVuY3Rpb24gKG5vZGUsIGFyZ3MpIHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgUGFyZW50aGVzZXNFeHByZXNzaW9uOiBQYXJlbnRoZXNlc0V4cHJlc3Npb24sXG4gIERpcmVjdEV4cHJlc3Npb246IERpcmVjdEV4cHJlc3Npb24sXG4gIERvdEV4cHJlc3Npb246IERvdEV4cHJlc3Npb24sXG4gIE5hbWVFeHByZXNzaW9uOiBOYW1lRXhwcmVzc2lvblxufTsiLCJjb25zdCBGb3JFYWNoID0gZnVuY3Rpb24gKG5vZGUsIGFyZ3MpIHt9O1xuY29uc3QgRm9yID0gZnVuY3Rpb24gKG5vZGUsIGFyZ3MpIHt9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgRm9yOiBGb3IsXG4gIEZvckVhY2g6IEZvckVhY2hcbn07IiwiY29uc3QgRnVuY3Rpb25EZWZpbml0aW9uID0gZnVuY3Rpb24gKG5vZGUsIGFyZ3MpIHt9O1xuXG5jb25zdCBSZXR1cm5TdGF0ZW1lbnQgPSBmdW5jdGlvbiAobm9kZSwgYXJncykge307XG5cbmNvbnN0IEZ1bmN0aW9uQ2FsbCA9IGZ1bmN0aW9uIChub2RlLCBhcmdzKSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEZ1bmN0aW9uRGVmaW5pdGlvbjogRnVuY3Rpb25EZWZpbml0aW9uLFxuICBSZXR1cm5TdGF0ZW1lbnQ6IFJldHVyblN0YXRlbWVudCxcbiAgRnVuY3Rpb25DYWxsOiBGdW5jdGlvbkNhbGxcbn07IiwiY29uc3QgSWYgPSBmdW5jdGlvbiAobm9kZSwgYXJncykge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBJZjogSWZcbn07IiwiY29uc3QgT2JsaXZJZiA9IGZ1bmN0aW9uIChub2RlLCBhcmdzKSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE9ibGl2SWY6IE9ibGl2SWZcbn07IiwiY29uc3QgQXJyYXlFeHByZXNzaW9uID0gZnVuY3Rpb24gKG5vZGUsIGFyZ3MpIHt9O1xuY29uc3QgUmFuZ2VFeHByZXNzaW9uID0gZnVuY3Rpb24gKG5vZGUsIGFyZ3MpIHt9O1xuY29uc3QgTGl0ZXJhbEV4cHJlc3Npb24gPSBmdW5jdGlvbiAobm9kZSwgYXJncykge307XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBBcnJheUV4cHJlc3Npb246IEFycmF5RXhwcmVzc2lvbixcbiAgUmFuZ2VFeHByZXNzaW9uOiBSYW5nZUV4cHJlc3Npb24sXG4gIExpdGVyYWxFeHByZXNzaW9uOiBMaXRlcmFsRXhwcmVzc2lvblxufTsiLCJjb25zdCBUeXBlTm9kZSA9IGZ1bmN0aW9uIChub2RlLCBhcmdzKSB7fTtcbmNvbnN0IFZhcmlhYmxlRGVmaW5pdGlvbiA9IGZ1bmN0aW9uIChub2RlLCBhcmdzKSB7fTtcbmNvbnN0IFZhcmlhYmxlQXNzaWdubWVudCA9IGZ1bmN0aW9uIChub2RlLCBhcmdzKSB7fTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFR5cGVOb2RlOiBUeXBlTm9kZSxcbiAgVmFyaWFibGVEZWZpbml0aW9uOiBWYXJpYWJsZURlZmluaXRpb24sXG4gIFZhcmlhYmxlQXNzaWdubWVudDogVmFyaWFibGVBc3NpZ25tZW50XG59OyIsImNvbnN0IGppZmYgPSByZXF1aXJlKCcuL2ppZmYuanNvbicpO1xuY29uc3QgcnVzdEJHVyA9IHJlcXVpcmUoJy4vcnVzdEJHVy5qc29uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBqaWZmOiBqaWZmLFxuICBydXN0QkdXOiBydXN0QkdXXG59OyIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJwYXJhbWV0ZXJzXCI6IFtcbiAgICB7XCJwYXJhbWV0ZXJcIjogXCJwXCIsIFwiZGVzY3JpcHRpb25cIjogXCJudW1iZXIgb2YgcGFydGllc1wifSxcbiAgICB7XCJwYXJhbWV0ZXJcIjogXCJiXCIsIFwiZGVzY3JpcHRpb25cIjogXCJudW1iZXIgb2YgYml0cyBpbiBmaWVsZFwifVxuICBdLFxuICBcIm1ldHJpY3NcIjogW1xuICAgIFwiT25saW5lIE1lc3NhZ2VzXCIsXG4gICAgXCJPbmxpbmUgUm91bmRzXCJcbiAgXSxcbiAgXCJvcGVyYXRpb25zXCI6IFtcbiAgICB7XG4gICAgICBcInJ1bGVcIjoge1xuICAgICAgICBcIm5vZGVUeXBlXCI6IFwiRnVuY3Rpb25DYWxsXCIsXG4gICAgICAgIFwibWF0Y2hcIjogXCJeamlmZkNsaWVudFxcXFwuc2hhcmUoQFApJFwiXG4gICAgICB9LFxuICAgICAgXCJjb3N0XCI6IFwicC0xXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwicnVsZVwiOiB7XG4gICAgICAgIFwibm9kZVR5cGVcIjogXCJGdW5jdGlvbkNhbGxcIixcbiAgICAgICAgXCJtYXRjaFwiOiBcIl48dHlwZTpudW1iZXIsc2VjcmV0OnRydWU+XFxcXC5zbXVsdCg8dHlwZTpudW1iZXIsc2VjcmV0OnRydWU+QFApJFwiXG4gICAgICB9LFxuICAgICAgXCJjb3N0XCI6IFwicC0xXCJcbiAgICB9XG4gIF1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwicGFyYW1ldGVyc1wiOiBbXG4gICAge1wicGFyYW1ldGVyXCI6IFwicFwiLCBcImRlc2NyaXB0aW9uXCI6IFwibnVtYmVyIG9mIHBhcnRpZXNcIn0sXG4gICAge1wicGFyYW1ldGVyXCI6IFwiYlwiLCBcImRlc2NyaXB0aW9uXCI6IFwibnVtYmVyIG9mIGJpdHMgaW4gZmllbGRcIn1cbiAgXSxcbiAgXCJtZXRyaWNzXCI6IFtcbiAgICBcIk9ubGluZSBNZXNzYWdlc1wiLFxuICAgIFwiT25saW5lIFJvdW5kc1wiXG4gIF0sXG4gIFwib3BlcmF0aW9uc1wiOiBbXG4gICAge1xuICAgICAgXCJydWxlXCI6IHtcbiAgICAgICAgXCJub2RlVHlwZVwiOiBcIkRpcmVjdEV4cHJlc3Npb25cIixcbiAgICAgICAgXCJtYXRjaFwiOiBcIl48dHlwZTpudW1iZXIsc2VjcmV0OnRydWU+XFxcXCs8dHlwZTpudW1iZXIsc2VjcmV0OnRydWU+JFwiXG4gICAgICB9LFxuICAgICAgXCJjb3N0XCI6IHtcbiAgICAgICAgXCJPbmxpbmUgTWVzc2FnZXNcIjogXCIwXCIsXG4gICAgICAgIFwiT25saW5lIFJvdW5kc1wiOiBcIjBcIlxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJydWxlXCI6IHtcbiAgICAgICAgXCJub2RlVHlwZVwiOiBcIkRpcmVjdEV4cHJlc3Npb25cIixcbiAgICAgICAgXCJtYXRjaFwiOiBcIl48dHlwZTpudW1iZXIsc2VjcmV0OnRydWU+XFxcXCo8dHlwZTpudW1iZXIsc2VjcmV0OnRydWU+JFwiXG4gICAgICB9LFxuICAgICAgXCJjb3N0XCI6IHtcbiAgICAgICAgXCJPbmxpbmUgTWVzc2FnZXNcIjogXCJwLTFcIixcbiAgICAgICAgXCJPbmxpbmUgUm91bmRzXCI6IFwiMVwiXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJ1bGVcIjoge1xuICAgICAgICBcIm5vZGVUeXBlXCI6IFwiRGlyZWN0RXhwcmVzc2lvblwiLFxuICAgICAgICBcIm1hdGNoXCI6IFwiXjx0eXBlOm51bWJlcixzZWNyZXQ6dHJ1ZT48PHR5cGU6bnVtYmVyLHNlY3JldDp0cnVlPiRcIlxuICAgICAgfSxcbiAgICAgIFwiY29zdFwiOiB7XG4gICAgICAgIFwiT25saW5lIE1lc3NhZ2VzXCI6IFwiYioocC0xKVwiLFxuICAgICAgICBcIk9ubGluZSBSb3VuZHNcIjogXCJiLTFcIlxuICAgICAgfVxuICAgIH1cbiAgXVxufSIsImNvbnN0IGNvc3RzID0gcmVxdWlyZSgnLi9jb3N0cy9pbmRleC5qcycpO1xuY29uc3QgcGFyc2VycyA9IHJlcXVpcmUoJy4vaXIvcGFyc2Vycy5qcycpO1xuY29uc3QgYW5hbHl6ZSA9IHJlcXVpcmUoJy4vYW5hbHl6ZS9hbmFseXplLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb3N0czogY29zdHMsXG4gIHBhcnNlcnM6IHBhcnNlcnMsXG4gIGFuYWx5emU6IGFuYWx5emVcbn07IiwiY29uc3QgcGFyc2VKYXZhc2NyaXB0ID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgcmV0dXJuIHt9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZUphdmFzY3JpcHQ7IiwiY29uc3QgcnVzdCA9IHJlcXVpcmUoJy4vcnVzdC5qcycpO1xuY29uc3QgamF2YXNjcmlwdCA9IHJlcXVpcmUoJy4vamF2YXNjcmlwdC5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcnVzdDogcnVzdCxcbiAgamF2YXNjcmlwdDogamF2YXNjcmlwdFxufTsiLCJjb25zdCBJUiA9IHJlcXVpcmUoJy4uLy4uL2RvY3MvbWVyZ2Vfc29ydF9kZWR1cF9pci5qc29uJyk7XG4vLyBUT0RPOiByZXF1aXJlIHdhc20gYnVuZGxlIGZyb20gcnVzdC9kaXN0L2J1bmRsZS5qcyBhbmQgdXNlIGl0IHRvIHBhcnNlIGludG8gSVJcbmNvbnN0IHBhcnNlUnVzdCA9IGZ1bmN0aW9uIChjb2RlKSB7XG4gIHJldHVybiBJUjtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VSdXN0OyIsIi8vIEFsbCBub2RlIHR5cGVzIHRoYXQgY2FuIGJlIHZpc2l0ZWRcbmNvbnN0IElSX05PREVTID0gW1xuICAvLyBsb2dpY2FsIG5vZGVzXG4gICdUeXBlTm9kZScsXG4gIC8vIHN0YXRlbWVudHNcbiAgJ0Z1bmN0aW9uRGVmaW5pdGlvbicsXG4gICdSZXR1cm5TdGF0ZW1lbnQnLFxuICAnVmFyaWFibGVEZWZpbml0aW9uJyxcbiAgJ0ZvckVhY2gnLFxuICAnRm9yJyxcbiAgJ1ZhcmlhYmxlQXNzaWdubWVudCcsXG4gIC8vIGV4cHJlc3Npb25zXG4gICdJZicsXG4gICdPYmxpdklmJyxcbiAgJ0xpdGVyYWxFeHByZXNzaW9uJyxcbiAgJ05hbWVFeHByZXNzaW9uJyxcbiAgJ0RpcmVjdEV4cHJlc3Npb24nLFxuICAnUGFyZW50aGVzZXNFeHByZXNzaW9uJyxcbiAgJ0FycmF5QWNjZXNzJyxcbiAgJ1JhbmdlRXhwcmVzc2lvbicsXG4gICdTbGljZUV4cHJlc3Npb24nLFxuICAnQXJyYXlFeHByZXNzaW9uJyxcbiAgJ0Z1bmN0aW9uQ2FsbCcsXG4gICdEb3RFeHByZXNzaW9uJ1xuXTtcblxuLy8gVGhlIHZpc2l0b3IgY2xhc3NcbmZ1bmN0aW9uIElSVmlzaXRvcihJUikge1xuICB0aGlzLklSID0gSVI7XG59XG5cbi8vIFN0YXJ0IHZpc2l0aW5nXG5JUlZpc2l0b3IucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgdGhpcy52aXNpdCh0aGlzLklSLCBhcmdzKTtcbn07XG5cbklSVmlzaXRvci5wcm90b3R5cGUudmlzaXQgPSBmdW5jdGlvbiAobm9kZSwgYXJncykge1xuICBpZiAobm9kZSA9PSBudWxsIHx8IG5vZGUubm9kZVR5cGUgPT0gbnVsbCkge1xuICAgIHJldHVybiBhcmdzO1xuICB9XG5cbiAgcmV0dXJuIHRoaXNbJ3Zpc2l0Jytub2RlLm5vZGVUeXBlXShub2RlLCBhcmdzKTtcbn07XG5cbklSVmlzaXRvci5wcm90b3R5cGUuYWRkVmlzaXRvciA9IGZ1bmN0aW9uIChub2RlVHlwZSwgdmlzaXRvckZ1bmN0aW9uKSB7XG4gIGlmIChJUl9OT0RFUy5pbmRleE9mKG5vZGVUeXBlKSA9PT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0dGVtcHRlZCB0byBhZGQgdmlzaXRvciBmb3IgaWxsZWdhbCBub2RlIHR5cGUgXCInICsgbm9kZVR5cGUgKyAnXCIhJyk7XG4gIH1cblxuICB0aGlzWyd2aXNpdCcrbm9kZVR5cGVdID0gdmlzaXRvckZ1bmN0aW9uLmJpbmQodGhpcyk7XG59O1xuXG5JUlZpc2l0b3IucHJvdG90eXBlLmFkZFZpc2l0b3JzID0gZnVuY3Rpb24gKHZpc2l0b3JzTWFwKSB7XG4gIGZvciAobGV0IG5vZGVUeXBlIGluIHZpc2l0b3JzTWFwKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2aXNpdG9yc01hcCwgbm9kZVR5cGUpKSB7XG4gICAgICB0aGlzLmFkZFZpc2l0b3Iobm9kZVR5cGUsIHZpc2l0b3JzTWFwW25vZGVUeXBlXSk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBEZWZhdWx0IHZpc2l0b3IgdXNlZCBmb3Igbm9kZSB0eXBlcyBmb3Igd2hpY2ggYSB1c2VyIHZpc2l0b3Igd2FzIG5vdCBzZXRcbmNvbnN0IGRlZmF1bHRWaXNpdG9yID0gZnVuY3Rpb24gKG5vZGVUeXBlLCBub2RlLCBhcmdzKSB7XG4gIGNvbnNvbGUubG9nKCdXYXJuaW5nOiB2aXNpdG9yIGZ1bmN0aW9uIGZvcicsIG5vZGVUeXBlLCAnaXMgdW5kZWZpbmVkIScpO1xuICByZXR1cm4gYXJncztcbn07XG5mb3IgKGxldCBpID0gMDsgaSA8IElSX05PREVTLmxlbmd0aDsgaSsrKSB7XG4gIGNvbnN0IG5vZGVUeXBlID0gSVJfTk9ERVNbaV07XG4gIElSVmlzaXRvci5wcm90b3R5cGVbJ3Zpc2l0Jytub2RlVHlwZV0gPSBkZWZhdWx0VmlzaXRvci5iaW5kKG51bGwsIG5vZGVUeXBlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJUlZpc2l0b3I7Il19
