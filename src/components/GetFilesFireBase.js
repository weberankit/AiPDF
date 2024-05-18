
import {langugesConstant} from "../utils/langugesConstant"
import { getStorage, ref, getDownloadURL , deleteObject} from "firebase/storage";
import { toggler } from "../utils/userFiles";
import { useDispatch ,useSelector} from "react-redux";
import { textFile } from "../utils/userSlice";
//import { useSelector } from "react-redux"
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import DisplaySimplePdf from "./DisplaySimplePdf"
import ShowSimplePdf from "./ShowSimplePdf"
import {useState,useEffect} from "react"
import {addUrlAdvPdf, addUrlPdf} from "../utils/useStoreDataSlice"
import Joyride from 'react-joyride'; // Import Joyride
//import tourSteps from "../utils/tourSteps"
import {SecondTourSteps} from "../utils/tourSteps"
import { Trash } from "react-bootstrap-icons";
//import fileSvg from "../images/img/filesvg.svg"
import useSupportLang from "../utils/useSupportLang";





const GetFilesFireBase=({slectfileMeta,SetMsg ,setPrintFileName})=>{
  const {file1,file2,file3 ,file4,file5,del1 , del2 } = langugesConstant[useSupportLang()]
const textAlertMsg=file4
const textMessageAlert=file5
const dispatch=useDispatch()
   const storage=getStorage()
 const [deleteIndication ,setDeleteIndication] = useState(null)
  async function handleText(path) {
    try {
      const url = await getDownloadURL(ref(storage, path));
      const response = await fetch(url);
  
      if (!response.ok) {
       // throw new Error(`Error fetching file: ${response.statusText}`);
      }
  
      const text = await response.text();
      dispatch(textFile(text));
  
    } catch (error) {
     // console.error('Error fetching file:');
    }
  }
   
  function handlePdf(path){
      getDownloadURL(ref(storage, path))
    .then((url) => {
     // console.log(url) 
   //setDispatch(url)
   dispatch(addUrlPdf(url))
    
      SetMsg(null)
    })
    .catch((error) => {
      SetMsg("sorry their is some issue")
      // Handle any errors
    });
  }
  //handleAdvPdf(item._location.path)
  function handleAdvPdf(path ){
    getDownloadURL(ref(storage, path))
  .then((url) => {
    //console.log(url) 
 dispatch(addUrlAdvPdf(url))
 
    SetMsg(null)
  })
  .catch((error) => {
    SetMsg("sorry their is some issue")
    // Handle any errors
  });
}  




  //console.log(a)
  
  
function handleDelete(path){

  if(window.confirm(del1)){
  setDeleteIndication(del2)
    const desertRef = ref(storage, path);
  
    // Delete the file
    deleteObject(desertRef).then((item) => {
      dispatch(toggler())
      // File deleted successfully
      //console.log(item,"Items")
      dispatch(textFile(null))
     // setText(null)
     dispatch(addUrlPdf(null))
     dispatch(addUrlAdvPdf(null))
      //setUrl(null)
      //indicate
      setDeleteIndication(null)
    }).catch((error) => {
      // Uh-oh, an error occurred!
      setDeleteIndication("sorry not able to delete file please check network and retry")
    });
  }else{
    console.log("not deleted")
  }
  
  }
 
  
  function handleReachTop(value){
 return (  window.scrollTo({
  top: value,
  behavior: 'smooth' // Option for smooth scrolling
})

 )

  }


  function MangeAlertMsgAdvPdf(){
    let getItem=sessionStorage.getItem("alertAdv") || null
    console.log(getItem)

    if(!getItem){
    alert(textAlertMsg)
    sessionStorage.setItem("alertAdv","done")
    }

  }
  function MangeAlertMsgProPdf(){
    let getItemPro=sessionStorage.getItem("alertPro") || null
    console.log(getItemPro)

    if(!getItemPro){
    alert(textMessageAlert)
    sessionStorage.setItem("alertPro","done")
    }

  }

//console.log("myurl",myurl)
/**/







    return(
      <>
   


    {deleteIndication &&  <div className="text-center  text-red-600 bg-black w-1/2 m-auto rounded-md  text-sm animate-pulse fixed  left-0 right-0">{deleteIndication}</div>}
       
        {
slectfileMeta && slectfileMeta.map((item)=>{
//  console.log(item,item._location.path )
  const fileName=item._location.path.split("/").pop()
  const textFileidentify=item._location.path.split(".").pop()
  //textFileidentify==="txt"?setTextBtn()
 // console.log(textFileidentify)
 setPrintFileName(fileName)



  return(
  <>





  <div key={textFileidentify+Date.now()+9} className="mt-6 ">
<div className="max-w-[786px] m-auto">
<div className="p-6 bg-gray-100 rounded-lg shadow-lg relative ">
<button className="text-red-800 absolute right-0 top-0 p-1 text-base md:text-xl" onClick={()=>{handleDelete(item._location.path )}}><Trash/></button>
    <div className="flex flex-row justify-between p-1  ">
      <div className="w-1/2"><img className="w-44 md:w-52" loading="lazy"  src={"https://ucarecdn.com/62ce4afc-c404-49d8-abde-88fe7da2a11f/filesvg.svg"} alt="image"></img>
    
      </div>

     <div className="w-1/2">
    <div>
      <div className= " parenti sm:text-center mb-2 select-none sm:w-60 "> <h1 className=" main text-2xl md:text-4xl mt-0 md:mt-3  font-extrabold font-serif truncate">{fileName}</h1>   <p className="showel bg-gray-400 p-1 rounded-lg text-white absolute ">{fileName}</p></div>
<div className="flex flex-row  mt-8 w-full sm:w-52">
      <div className="text-center m-auto">
           { 
                   textFileidentify==="txt"?<button className=" btn text-base m-auto p-2 md:px-6 bg-black rounded-lg text-white font-semibold font-serif hover:bg-white hover:text-black transition-all duration-500" onClick={()=>{handleText(item._location.path);dispatch(addUrlPdf(null));dispatch(addUrlAdvPdf(null));handleReachTop(0)}}>{file1}</button> :  
                   <button className=" whitespace-nowrap btn text-base p-2 md:px-6 bg-black rounded-lg text-white font-semibold font-serif hover:bg-white hover:text-black transition-all duration-500" onClick={()=>{ MangeAlertMsgProPdf();handlePdf(item._location.path);   handleReachTop(0);dispatch(addUrlAdvPdf(null)) ;  dispatch(textFile(null))}}>{file2}</button>

                  }
      </div>

      <div className="sm:ml-1">{
              //to open high level-pdf viewer
              textFileidentify !== "txt" &&  <button className=" whitespace-nowrap btn ml-2 sm:ml-0 text-base p-2 md:px-6 bg-black rounded-lg text-white font-semibold font-serif hover:bg-white hover:text-black transition-all duration-500" onClick={()=>{MangeAlertMsgAdvPdf();handleAdvPdf(item._location.path) ;
              handleReachTop(0);dispatch(addUrlPdf(null));  dispatch(textFile(null)) }}> {file3}</button>
            }</div>

</div>
      <div></div>
    </div>

     </div>

    </div>
  </div>
</div>








              


                     
  
  </div>   
  </>)
})
}
 


</>  
    )
}
export default GetFilesFireBase