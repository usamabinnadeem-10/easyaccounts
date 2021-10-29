export const print = (elem) => {
  var mywindow = window.open("", "PRINT", "height=400,width=600");

  mywindow.document.write("<html><head><title>" + document.title + "</title>");
  mywindow.document.write("</head><body >");
  mywindow.document.write("<h1>" + document.title + "</h1>");
  mywindow.document.write(document.getElementById(elem).innerHTML);
  mywindow.document.write("</body></html>");

  mywindow.document.close();
  mywindow.focus();

  mywindow.print();
  //   mywindow.close();

  return true;
};
