<template>
    
        <el-dialog
            class="qrcodeDialog"
            :visible.sync="dialogState"
            width="35%"
            :before-close="handleClose"
            >
            <div class="dialogcontent" ref="dialogcontent">
                <div class="qrname">{{name}}</div>
                <img style="width:175px; height:175px":src="qrCode"></img>
            </div>
            <el-button style="margin-top:20px;" type="primary" @click="saveQrCode">保存二维码</el-button>
        </el-dialog>
    
</template>

<script>
import { getScenicDetailsApi,getFarmhouseDetailsApi } from "@/api/api";
import html2canvas from 'html2canvas'
export default {
  name: "qrcodeDownloader",
  props: {
        dialogState:{
          type:Boolean,
          default:false
        },
        id:{
            type:String,
            default:"1"
        },
        type:{
            type:String,
            default:""
        }
  },
  data() {
    return{
        name:"",
        qrCode:"",
    }
  },
  updated(){
      
        if(this.type=="farmhouse"){
            this.getFarmQr()
        }
        else{
           this.getQrcode() 
        }
  },
  methods:{
    async getQrcode(){
        try{
            const params = {
                scenicId: this.id
            };
            const res = await getScenicDetailsApi(params)
            this.name=res.name
            this.qrCode=res.qrCode
        }
        catch(e){

        }
      
    },
    async getFarmQr(){
        try{
            const params = {
                farmhouseId: this.id
            };
            const res = await getFarmhouseDetailsApi(params)
            this.name=res.name
            this.qrCode=res.qrCode
        }
        catch(e){

        }
      
    },
    saveQrCode(){
        window.pageYoffset = 0;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        html2canvas(this.$refs.dialogcontent,{
            width:400,
            height:533,
        }).then((canvas) => {        
           if (navigator.msSaveBlob) { // IE10+ 
                let blob = canvas.msToBlob();
                return navigator.msSaveBlob(blob, this.name+'.png'); 
            } else {
                let link = document.createElement("a"); 
                link.href = canvas.toDataURL("image/png");
                link.setAttribute('download', this.name + '.png')
                link.style.display = 'none'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link); 
            }
        })
    },
    handleClose(){
    
        this.$emit("closed")
    }
}

}

</script>

<style lang="less" scoped>
.qrcodeDialog {
  text-align:center;
}
.dialogcontent{
    width:400px;
    height:533px;
    padding: 0;
    border:2px solid #F5F5F5;
    border-radius:5px;
    background: url('../../assets/qrcode-background.jpg');
    background-size:100% 100%;
    margin:0 auto;
    position:relative;
    .qrname{
      width:400px;
      position:absolute;
      top:140px;
      left:0px;
      text-align:center;
      font-weight:bold;
      font-size:32px;
      color:rgb(255,255,255);
    }
    img{
      position:absolute;
      top:230px;
      left:114px;
    }
    
  }
</style>