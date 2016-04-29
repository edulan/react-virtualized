var REACT_VIRTUALIZED_BANNER = 'https://cloud.githubusercontent.com/assets/29597/11737732/0ca1e55e-9f91-11e5-97f3-098f2f8ed866.png'


function generateRandomCells (cellCount) {
  return Array.from({length: cellCount}, function () {
    return {
      x: Math.random() * 50000,
      y: Math.random() * 2000,
      width: Math.random() * 1000,
      height: Math.random() * 1000,
    };
  });
}

function getSizeAndPosition (cellIndex) {
  return cells[cellIndex];
}

function cellRenderer (cellIndex) {
  var cell = cells[cellIndex];
  var x = cell.x;
  var y = cell.y;
  var width = cell.width;
  var height = cell.height;
  var color = COLORS[cellIndex % COLORS.length];

  return React.DOM.div({
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width: width,
      height: height,
      borderWidth: 2,
      borderColor: color,
      borderStyle: 'solid',
    },
  });
}

function cellGroupRenderer (params) {
  var indices = params.indices;
  var cellRenderer = params.cellRenderer;

  return indices.map(function (cellIndex) {
    return cellRenderer(cellIndex);
  });
}

var COLORS = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
var cells = generateRandomCells(5000);

var App = React.createClass({
  render: function() {
    return React.createElement(
      ReactVirtualized.AutoSizer,
      null,
      function (params) {
        return [
          React.createElement(
            ReactVirtualized.Collection,
            {
              cellCount: cells.length,
              cellSizeAndPositionGetter: getSizeAndPosition,
              cellRenderer: cellRenderer,
              cellGroupRenderer: cellGroupRenderer,
              width: params.width,
              height: params.height,
            }
          )
        ];
      }
    )
  }
})

ReactDOM.render(
  React.createElement(App),
  document.querySelector('#mount')
)
