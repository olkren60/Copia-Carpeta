function copiaCarpeta(idOrigen,destino){
  var idOrigen = idOrigen || "idcarpetapredeterminada"
  var origen = DriveApp.getFolderById(idOrigen)
  var destino = destino || DriveApp.createFolder("Copia de "+origen.getName())
  
  //Copia los archivos 
  var iFiles = origen.getFiles()
  while(iFiles.hasNext())
  {
    var archivo = iFiles.next()
    archivo.makeCopy(archivo.getName(),destino)
  }
  
  //Copia las carpetas 
  var iFolders = origen.getFolders()
  while(iFolders.hasNext())
  {
    var subcarpeta = iFolders.next()
    var subDestino = destino.createFolder(subcarpeta.getName())
    //Recursivo
    copiaCarpeta(subcarpeta.getId(),subDestino)
  }
  
  return destino.getUrl()
}
