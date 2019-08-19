/* global $ */
$(document).ready(function(){
var hexValues;
   //////////////////////////////////////////////////
  //Thank you to http://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/  for the detailed explanation of how to convert rgb to hsl, which I based this code off of.
 /////////////////////////////////////////////////////
 function HSL(a,b,c){
    a = a/255;
    b = b/255;
    c = c/255;
    var max = Math.max(a,b,c);
    var min = Math.min(a,b,c);
    var lum = (((max + min)/2)*100).toFixed(1);
    var hue,sat;
    if (min == max){
      hue=0;
      sat=0;
    }
    else if(lum<50){
      sat = (((max-min)/(max+min)*100)).toFixed(1);
    }
    else {
      sat = (((max-min)/(2-max-min)*100)).toFixed(1);
    }
    if (hue !== 0 && a == Math.max(a,b,c)){
      hue = Math.round((b-c)/(max-min)*60);
    }
    else if (hue !== 0 && b == Math.max(a,b,c)){
      hue = Math.round(2+((c-a)/(max-min))*60);
    }
    else if (hue !== 0){
      hue = Math.round((4 + ((a-b)/(max-min)))*60);    
             }
   if (hue<0){hue+=360;}
    return '<td>hsl('+hue+','+sat+'&#37,'+lum+'&#37;)</td>';
  }
  function convert(){
    hexValues = $('#hexArr').val();
    hexValues = hexValues.replace(/\#|\s+/g, '');
    var hexArr = hexValues.split(',');
    for (i=0;i<hexArr.length;i++){
      if(hexArr[i]===""){i++};
      var R = parseInt(hexArr[i].slice(0,2),16);
      var G = parseInt(hexArr[i].slice(2,4),16);
      var B = parseInt(hexArr[i].slice(4,6),16);
      $('#father').append($('<tr class="'+hexArr[i]+'"><td>#' + hexArr[i] + '</td><td> rgba('+R+','+G+','+B+',1)</td>'+ HSL(R,G,B)+'<td class="box" style="background-color:rgba(' + R+','+G+','+B+',1)">&nbsp</td>'+'</tr>').hide().fadeIn());    
    }}
 
  $('#button').click(function(){convert();}  
  );
 $('#clear').click(function(){
   $('#father tr').slice(1).fadeOut();
 });
 $('#save').click(function(){
   localStorage.userHex = $('#hexArr').val();
   alert('Values saved to localStorage.userHex .');
 });
 $('#saveTable').click(function(){
   localStorage.userTable = $('#father').html();
   alert('Table saved to localStorage.userTable .');
 });
  $('#clearSave').click(function(){
   localStorage.removeItem("userHex");
    alert('localStorage.userHex cleared.');
 });
 $('#retrieve').click(function(){
  if (localStorage.userHex) {
   $('#hexArr').val(localStorage.userHex); 
 }
   
 else {alert('No stored values found!')}})
 
 $('#retrieveTable').click(function(){
  if (localStorage.userTable) {
   $('#father').html($(localStorage.userTable).hide().fadeIn()); 
 }
   
 else {alert('No stored table found!')}})
 
 $('#clearSaveTable').click(function(){
   localStorage.removeItem("userTable");
    alert('localStorage.userTable cleared.');
 });
});
