package com.esa.manager.util;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class FileUtil {

	/**
	 * 件文件保存到本地
	 * stream   文件流
	 * savaUrl  文件要写入的地址
	 * @param url
	 * @throws FileNotFoundException 
	 */
	public static  void SaveFile(InputStream stream,String savaUrl,String fileName) throws FileNotFoundException{
		try {
			isExist(savaUrl); //判断文件夹是否存在,如果不存在则创建文件夹
			OutputStream os = new FileOutputStream(new File(savaUrl+"/"+fileName));
			int len = 0;
			byte[] b = new byte[1024];
			while ((len = stream.read(b)) > 0){
				os.write(b, 0, len);
			}
			b = null;
			stream.close();
			os.close();			
		} catch (Exception e) {
			e.printStackTrace();
		}  
		
	}
	
	
	/**
	 * 保存文件
	 * @param multipartFile
	 * @param filePath 文件完整路径
	 * @param overWrite 是否覆盖已有文件
	 * @throws Exception
	 */
	public static void saveUploadFile(MultipartFile multipartFile, String filePath, boolean overWrite) throws Exception {
		File f = new File(filePath);
		if(f.exists() && overWrite) {
			f.delete();
		}
		
		if(!f.getParentFile().exists()) {
			f.getParentFile().mkdirs();
		}
		multipartFile.transferTo(f);
	}
	
	 /**
	  * 
	  * @param path 文件夹路径
	  */
	 public static void isExist(String path) {
		 File file = new File(path);
		 if (!file.exists()) {
			 file.mkdir();
		 }
	 }
	/**
	 * 创建文件夹
	 * folderPath  要存入的文件夹
	 * @param folderPath
	 */
	public static void newFolder(String folderPath) {
        try {
            String filePath = folderPath;
            filePath = filePath.toString();
            java.io.File myFilePath = new java.io.File(filePath);
            if (!myFilePath.exists()) {
                myFilePath.mkdir();
            }
        }
        catch (Exception e) {
            System.out.println("新建目录操作出错");
            e.printStackTrace();
        }
    }

	 /**
     * 删除文件夹中的文件
     * @param filePathAndName String 文件路径及名称 如c:/fqf.txt
     * @param fileContent String
     * @return boolean
     */
   public static void delFolderFile(String filePathAndName) {
       try {
           String filePath = filePathAndName;
           filePath = filePath.toString();
           File myDelFile = new File(filePath);
           myDelFile.delete();

       }
       catch (Exception e) {
           System.out.println("删除文件操作出错");
           e.printStackTrace();

       }

   }

   /**
    * 判断在此文件夹中，此图片是否存在。
    * @param url
    * @return
    */
   public static String isPicCZ(String picUrl,String picName){
	   String bool = "";
		try{
			picUrl = picUrl+"//"+picName;
			File myFilePath = new File(picUrl);
			if (myFilePath.exists()) 
				bool += "【"+picName+"】";
		}catch (Exception e) {
			e.printStackTrace();
		}
		if(bool == ""){
			bool = "ok";
		}
		return bool;
   }
	/**
	 * 判断此文件夹中是否存在文件
	 * @param fileUrl
	 * @return
	 */
   public static boolean isListFiles(String fileUrl){
	   boolean bool = true;
	   try{
		   File file = new File(fileUrl);
		   if(file.exists()){
			   int intFile = file.listFiles().length;
			   if(intFile == 0)
				   bool = true;
			   else
				   bool = false;
		   }
	   }catch (Exception e) {
		   e.printStackTrace();
	   }
	   return bool;
   } 
	
	public static void main(String str[]) throws FileNotFoundException{
//		String fn = "图夹2";
		//1.创建文件夹
//			String url = "E://Program Files//Tomcat 6.0//webapps//bookdraw//HTML//uploadImg//"+fn;
//			String sva = "E://Program Files//Tomcat 6.0//webapps//bookdraw//HTML//uploadImg//"+fn;
		 	//newFolder(url);
		 
		//2.删除文件夹中的文件
		 	//delFile(url+"//Blue hills.jpg");
		
		//3.判断此文件夹中是否存在此文件
//			String s = url+"//Blue hills.jpg";
//			File myFilePath = new File(s);
//			if (!myFilePath.exists()) {
//               System.out.println("不存在此图片，可以新建并写入！");
//            }
//		 	System.out.println(isListFiles(url));
		
		//4判断文件夹是否存在
//		String url = "d://hanxiansheng";
//		isExist(url);
		
//		String serversUrl = "/usr/uploadfile/"+"ddd";
//		System.out.println(serversUrl);
		List<String> list = new ArrayList<String>();
		list.add("aa");
		list.add("bb");
		for(String e: list){  
		     list.remove(e);  
		};  
		System.out.println(list.size());
		
	}
	

	
}
