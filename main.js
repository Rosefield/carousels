var onlineRounds = costs.onlineRounds;


window.onload = function() {
  $('code').each(function(){ $(this).html(($(this).html().trim()));});
  $('textarea').each(function(){ $(this).text(($(this).text().trim()));});
  //hljs.initHighlightingOnLoad();

  Chart.defaults.global.animation.duration = 100;
  window.graph_config = {
    type: 'line',
    data: {},

    options: {
      responsive:false,
      tooltips:{mode:'index', intersect:false},
      hover:{mode:'nearest', intersect:true},
      scales:{
        xAxes:[{display:true, scaleLabel:{display:true, labelString:'bits'}}],
        yAxes:[{display:true, scaleLabel:{display:true, labelString:'messages'}}]
      }
    }
  };
  var ctx = document.getElementById('canvas');
  window.myLine = new Chart(ctx, window.graph_config);
  demo('spec', 'inp', 'out');
};

window.spec = {};

function createMetric(spec) {
  return function () {
    var zero = polynomium.c(0).toObject(), //create constant polynomium = 0
        one = polynomium.c(1).toObject(), //create constant polynomium = 1
        plus = function (sum, node) { return polynomium.add(sum, node.metric).toObject(); }, // add two polynomials
        dot = function (mult, node) { return polynomium.mul(mult, node.metric).toObject(); } // multiply two polynomials
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
            console.log("CallExpression");
            console.log(p);

            // checks if CallExpression was invoked by MemberExpression or not
            var op_name = (p.node.callee.name != undefined) ? p.node.callee.name : p.node.callee.property.name;
            var start = p.node.loc.start;
            var arguments = p.node.arguments;

            console.log(arguments)
            if (op_name in spec) {
              p.node.metric = arguments.reduce(plus, spec[op_name]);
            } else {
              throw Error("Node type CallExpression with operator " + op_name +
                          " is not handled at line " + start.line + ", column " + start.column + ".");
            }
          }
        },
        MemberExpression:{
          "exit": function (p) {
            console.log("MemberExpression");

            //TODO: Check that this is not a shallow copy
            caller_object = p.node.object;
            arguments = p.container.arguments;
            arguments.unshift(caller_object);

      }
        },
        FunctionDeclaration: {
          "exit": function (p) {
            p.node.metric = p.node.body.metric;
            console.log(p.node.metric );
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
Babel.registerPlugin('metric', createMetric(window.spec));

function range(n) {
  var xs = [];
  for (var i = 0; i < n; i++)
    xs.push(i);
  return xs;
}

function demo(specText, inpText, outDiv) {

  var spec = onlineRounds;
  var str = document.getElementById(inpText).value;
  if (str.length == 0) {
    document.getElementById(outDiv).innerHTML = "No input provided.";
  } else {
    try {
      // Convert specification cost strings into polynomials.
      for (var op in spec){
        window.spec[op] = carousels.parsePoly(spec[op]);
      }

      var bbl = Babel.transform(str, {plugins: ['metric']});
      document.getElementById(outDiv).innerHTML = stringify(bbl.ast.program.results, {maxLength:120}).trim();

      var ran = range(25);
      window.graph_config.data.datasets = [];
      window.graph_config.data.labels = ran;

      var color_seed = 0;
      for (var name in bbl.ast.program.metric) {
        color_seed += 10;

        var p = bbl.ast.program.metric[name];
        var color = randomColor({"seed":color_seed});
        window.graph_config.data.datasets.push({

          label:name,
          backgroundColor:color,
          borderColor:color,
          data:ran.map(function (b) { return polynomium.evaluate(p, {"b":b}); }),
          fill:false

        });
      }
      document.getElementById('spec').value = JSON.stringify(onlineRounds, null, " ");

      window.myLine.update();
    } catch (err) {
      document.getElementById(outDiv).innerHTML = err.message;
    }
  }
}

module = {}; // Avoid error from json-stringify-pretty-compact below.


// function f(x) {
//   return x.sdiv(3);
// }
// function g(x){
//   var y = 4;
//   [x,y].map(f);
// }