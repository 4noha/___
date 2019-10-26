renderTable = function(){
  // table向け配列データに整形
  menu2 = ["飲み物"];
  Object.keys(menu["飲み物"]).map(key => menu2.push( {name: key, value: menu["飲み物"][key]} ));
  menu2.push("食べ物");
  Object.keys(menu["食べ物"]).map(
    key => Object.keys(menu["食べ物"][key]).map(key2 => menu2.push( {name: key2, value: menu["食べ物"][key][key2]} ))
  );

  var lineCount = Math.floor(menu2.length / 2);
  var diff = 1;
  var text1;
  var text2;
  var text3;
  var text4;

  for( var i=0; i < lineCount; i++ )
  {
    text2 = "";
    text4 = "";
    if( typeof menu2[i] === 'string' )
    {
      diff--;

      text1 = `<b>${ menu2[i] }</b>`;
    } else {
      text1 = `${ i+diff }.${ menu2[i].name }`;
      if( typeof menu2[i].value.price === 'number' )
      {
        text2 = `${ menu2[i].value.price }円`;
      } else {
        Object.keys( menu2[i].value.price ).map( key => text2 += `${ key } ${ menu2[i].value.price[key] }円 ` );
      }
    }

    if( typeof menu2[lineCount+i] === 'string' )
    {
      diff--;

      text3 = `<b>${menu2[ lineCount+i ]}</b>`;
    } else {
      text3 = `${ lineCount+i-1 }.${ menu2[ lineCount+i ].name }`;
      if( typeof menu2[lineCount+i-1].value.price === 'number' )
      {
        text4 = `${ menu2[lineCount+i-1].value.price }円`;
      } else {
        Object.keys( menu2[lineCount+i-1].value.price ).map( key => text4 += `${ key } ${ menu2[lineCount+i-1].value.price[key] }円 ` );
      }
    }
    $('#table').append(`<tr><td id="cell${ i+1 }">${ text1 }</td><td>${ text2 }</td><td id="cell${ lineCount+i+1 }">${ text3 }</td><td>${ text4 }</td><</tr>`);
  }
}