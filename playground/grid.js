function renderCell (params) {
  return null;
}

var colors = ['red', 'green', 'yellow', 'blue', 'purple', 'orange'];

function renderCellRanges (params) {
  var columnStartIndex = params.columnStartIndex;
  var columnStopIndex = params.columnStopIndex;
  var rowStartIndex = params.rowStartIndex;
  var rowStopIndex = params.rowStopIndex;

  var columns = params.columnMetadata.slice(columnStartIndex, columnStopIndex + 1).map(function (dimensions, index) {
    return React.DOM.div({
      className: 'column',
      style: {
        backgroundColor: colors[(columnStartIndex + index) % 6],
        position: 'absolute',
        left: dimensions.offset,
        width: dimensions.size,
        height: 250, //(rowStopIndex - rowStartIndex + 1) * 20,
        borderLeft: '2px solid gray',
        borderRight: '2px solid gray',
      },
    })
  });

  var rows = params.rowMetadata.slice(rowStartIndex, rowStopIndex + 1).map(function (dimensions, index) {
    return React.DOM.div({
      className: 'row',
      style: {
        position: 'absolute',
        opacity: 0.2,
        top: dimensions.offset,
        backgroundColor: colors[(rowStartIndex + index) % 6],
        height: dimensions.size,
        width: 800, //(columnStopIndex - columnStartIndex + 1) * 40,
        borderTop: '2px solid gray',
        borderBottom: '2px solid gray',
      },
    })
  });

  return [].concat(columns, rows);
}

function renderScrollArea(params2) {
  return React.DOM.div(
    {
      onScroll: function (event) {;
        params2.onScroll({
          scrollLeft: event.target.scrollLeft,
          scrollTop: event.target.scrollTop
        });
      },
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        overflow: 'scroll',
        width: 800,
        height: 250
      }
    },
    React.DOM.div(
      {
        style: {
          overflow: 'hidden',
          width: 800 * 40,
          height: 2000 * 20
        }
      }
    )
  )
}

var scrollLeft = 0;
var scrollTop = 0;

function renderSyntheticScrollArea(params2) {
  return React.DOM.div(
    {
      onWheel: function (event) {;
        const deltaX = event.deltaX;
        const deltaY = event.deltaY;

        const speed = 1;
        const newDeltaX = deltaX * speed;
        const newDeltaY = deltaY * speed;

        scrollLeft = scrollLeft - (-newDeltaX);
        scrollTop = scrollTop - (-newDeltaY);

        params2.onScroll({
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        });
      },
      style: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 800,
        height: 250
      }
    }
  )
}

var App = React.createClass({
  render: function() {
    return React.createElement(
      ReactVirtualized.AutoSizer,
      null,
      function (params) {
        return React.createElement(
          ReactVirtualized.ScrollSync,
          null,
          function (params2) {
            return React.DOM.div(
              null,
              [
                React.createElement(
                  ReactVirtualized.Grid,
                  {
                    columnsCount: 800,
                    columnWidth: 40,
                    height: 250,
                    overscanColumnsCount: 10,
                    overscanRowsCount: 10,
                    renderCell: renderCell,
                    renderCellRanges: renderCellRanges,
                    rowHeight: 20,
                    rowsCount: 2000,
                    width: 800,
                    scrollLeft: params2.scrollLeft,
                    scrollTop: params2.scrollTop,
                  }
                ),
                renderSyntheticScrollArea(params2)
                // renderScrollArea(params2)
              ]
            );
          }
        );
      }
    );
  }
})

ReactDOM.render(
  React.createElement(App),
  document.querySelector('#mount')
)
