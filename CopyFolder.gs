function copiaCarpeta(idOrigen,destino){
  var idOrigen = idOrigen || "idcarpetapredeterminada"
  var origen = DriveApp.getFolderById(idOrigen)
  var destino = destino || DriveApp.createFolder("Copia de "+origen.getName())
  
  //1 Copia los archivos dentro de la carpeta origen
  var iFiles = origen.getFiles()
  while(iFiles.hasNext())
  {
    var archivo = iFiles.next()
    archivo.makeCopy(archivo.getName(),destino)
  }
  
  //2 Copia las carpetas de la ruta origen
  var iFolders = origen.getFolders()
  while(iFolders.hasNext())
  {
    var subcarpeta = iFolders.next()
    var subDestino = destino.createFolder(subcarpeta.getName())
    //Recursivo para aplicar la funcion a las carpetas dentro del origen
    copiaCarpeta(subcarpeta.getId(),subDestino)
  }
  
  return destino.getUrl()
}
