<template>
    <div class="identify-zone center">
        <div class="title">上传图片识别</div>
        <div>
            <ImgUpload ref="ImgUploadRef" @uploadPicture = "identify"/>
        </div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import { defineEmits } from 'vue'
    import { ElMessage } from 'element-plus'
    import ImgUpload from '@/components/common/ImgUpload.vue'
    import { recognizePlants } from '@/utils/api.js'
    import { toBase64 } from '@/utils/imgTransfer.js'


    const ImgUploadRef = ref(null); 

    //使用defineEmits创建名称，接受一个数组
    const emit = defineEmits(['identify'])//触发的方法名clickChild


    const identify = (val) =>{
        const formData = new FormData();
        formData.append('picture',val.fileList[0].raw);

        toBase64(formData)
        .then((base64String) => {
            // 识别
            recognizePlants({
                'img_base64': base64String,
            })
            .then(resp => {
                val.fileList.splice(0, 1);//删除fileList的第一个元素
                ImgUploadRef.value.$refs.uploadRef.clearFiles();
                console.log(resp);

                // 传结果给HomeView
                let param ={
                    content: resp  
                }
                //传递给父组件
                emit('identify',param)


                ElMessage.success('图片识别成功！')
            })
            .catch(err => {
                console.log(err);
                ElMessage.error('图片识别失败，请重试！')
            }) 
        })
        .catch((error) => {
            console.log(error);
            ElMessage.error('图片处理失败，请重试！');
        });
    }
</script>

<style scoped>

    .center{
        display:flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .identify-zone{
        height:70vh;
        width:70vw;
        border-radius:15px;
        margin:50px;
        background-image: url('@/assets/common/green2.jpg');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }

    .identify-zone .title{
        font-size: 24px;
        margin:20px;
        color:white;
    }

</style>