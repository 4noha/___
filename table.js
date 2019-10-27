renderTable = function(){
  // table向け配列データに整形
  menu2 = ["飲み物"];
  Object.keys(menu["飲み物"]).map(key => menu2.push( {name: key, value: menu["飲み物"][key]} ));
  menu2.push("食べ物");
  Object.keys(menu["食べ物"]).map(
    key => Object.keys(menu["食べ物"][key]).map(key2 => menu2.push( {name: key2, value: menu["食べ物"][key][key2]} ))
  );

  var lineCount = Math.floor(menu2.length / 2);
  var diff  = [1];
  var text1;
  var price1;
  var text2;
  var price2;
  current = null;

  // 1行ずつ描画
  for( var i=0; i < lineCount; i++ )
  {
    text1  = [""];
    text2  = [""];
    price1 = [""];
    price2 = [""];

    // 一列目のテキストと値段を生成
    buildMenuArray( text1, price1, i, 0, diff );
    // 2列めのテキストと値段を生成
    buildMenuArray( text2, price2, i, lineCount-1, null );

    // めくり用に40列40列のtrセルを描画
    lineHtml = `<tr id="tr-${i}" style="user-select:none;">`;
    renderHalfCells( text1[0], price1[0], i, 0 );
    // 真ん中仕切り
    lineHtml += `<td></td><td></td><td></td>`;
    // 右列描画
    renderHalfCells( text2[0], price2[0], i, lineCount );
    $('#table').append( `${lineHtml}</tr>` );
  }

  var re = new RegExp(/^[0-9]/);
  for( var i=0; i<30; i++ )
  {
    if($(`#cell${i}-0`).text().match(re)){
      eval(`
        $("#cell${i}-0").mousedown(function(){
            if(!current && $("#cell${i}-0").css('color') != "rgb(0, 0, 0)");{
              $("#cell${i}-0").css({"background-color":"#ffcccc", "color":"black"});
              current = "${i}-1";
            }
        });
        $("#cell${i}-0").bind('touchstart', function() {
            if(!current && $("#cell${i}-0").css('color') != "rgb(0, 0, 0)");{
              $("#cell${i}-0").css({"background-color":"#ffcccc", "color":"black"});
              current = "${i}-1";
            }
        });
      `);
      for( var j=0; j<30; j++ )
      {
        eval(`
          // クリックしている間だけ左からめくれる
          $("#cell${i}-${j}").hover(
            function () {
              console.log("hoge");
              console.log(current+":"+"${i}-${j}");
              if(current == "${i}-${j}"){
                $(this).css({"background-color":"#ffcccc", "color":"black"});
                current = "${i}-${j+1}";

                if( ${j}==64 || $("#cell${i}-${j+1}").css('color') == "rgb(0, 0, 0)" ){
                  current = null;
                  se();
                }
              }
          });
        `);
      }
    }
  }

/*
  console.log(`cell2-0`);
  let draggable = new DraggableElement(`cell2-0`);
  draggable.onChange = () => {
      console.log(`${draggable.x}, ${draggable.y}`);
  };
  draggabl = new DraggableElement(`cell3-0`);
  draggabl.onChange = () => {
      console.log(`${draggable.x}, ${draggable.y}`);
  };
  */
  //this.element.onmousedown = event => {this.onMouseDown(event);};
  //this.element.ontouchstart = event => {this.onMouseDown(event);};

  
  //registTurnEvent();
}

buildMenuArray = function( text, price, i, lineCount, diff ){
  if( typeof menu2[lineCount+i] === 'string' )
  {
    if( diff ){
      diff[0]--;
    }

    text[0] = `${menu2[ lineCount+i ]}`;
  } else {
    text[0] = `${ diff ? lineCount+i+diff[0] : lineCount+i }.${ menu2[ lineCount+i ].name }`;
    if( typeof menu2[lineCount+i].value.price === 'number' )
    {
      price[0] = `${ menu2[lineCount+i].value.price }円`;
    } else {
      Object.keys( menu2[lineCount+i].value.price ).map( key => price[0] += `${ key } ${ menu2[lineCount+i-1].value.price[key] }円 ` );
    }
  }
}

renderHalfCells = function( text, price, i, lineCount ){
  for( var j=0; j < 30; j++ )
  {
    if( price == "" )
    {
      if( text != "" )
      {
        lineHtml += `<td id="cell${ lineCount+i+1 }-${ j }"><b>${ text.substring(0, 1) }</b></td>`;
        text = text.slice(1);
      } else {
        lineHtml += `<td id="cell${ lineCount+i+1 }-${ j }"></td>`;
      }
    } else {
      if( text != "" )
      {
        lineHtml += `<td id="cell${ lineCount+i+1 }-${ j }" style="padding:1 0;text-align:center;background-color: white;color:white;border: solid 0 1 #ff0000">${ text.substring(0, 1) }</td>`;
        text = text.slice(1);
      } else {
        // 値段右詰め
        if( price.length >= 30-j )
        {
          lineHtml += `<td id="cell${ lineCount+i+1 }-${ j }">${ price.substring(0, 1) }</td>`;
          price = price.slice(1);
        } else {
          lineHtml += `<td id="cell${ lineCount+i+1 }-${ j }"></td>`;
        }
      }
    }
  }
}

onMouseDown = function(event) {
    console.log($(this));
};