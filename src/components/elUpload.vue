<template>
  <!-- el-upload
action:上传接口地址
name:上传接口对应参数
show-file-list:是否显示文件列表
before-upload：上传前回调  function(file){ file.type   size:大小  return boolean值   true正常执行上传 ,false取消上传 }
on-success：上传成功回调  function(res,file){res:接口返回数据,file:file.raw===上传文件的file格式}
 -->
  <el-upload
    class="avatar-uploader"
    :action="baseUrl + '/question/upload'"
    name="file"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :on-success="handleAvatarSuccess"
  >
    <div v-if="type == 'video'">
      <!-- video   controls:控制面板显示   -->
      <video
        v-if="value"
        :src="baseUrl + '/' + value"
        class="avatar"
        controls
        autoplay
      ></video>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <div v-else>
      <img v-if="value" :src="baseUrl + '/' + value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
  </el-upload>
</template>
<script>
export default {
  // 原始值不能修改，引用值（object，array function）可以修改（堆可以修改，栈不能修改）
  props: ['value', 'type'],
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL,
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess (res) {
      window.console.log(res)
      //   this.value = res.data.url
      // 让父组件修改value值，子触发父方法去修改value值
      this.$emit('input', res.data.url)
      //   this.imageUrl = res.data.url
      //   this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      // eslint-disable-next-line eqeqeq
      if (this.type == 'video') {
        window.console.log(file)
        const isVideo = file.type === 'video/mp4'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isVideo) {
          this.$message.error('上传只能是MP4格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传视频大小不能超过 2MB!')
        }
        return isVideo && isLt2M
      } else {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG,PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
