<template>
    <div>
        <div class="inputForm">      
            <el-form ref="form" :rules="rules" :model="form" class="demo-form-inline" label-width="80px">
                <el-form-item prop="name" label="用户名">
                    <el-input placeholder="请输入" v-model="form.name" clearable></el-input>
                </el-form-item> 
                <el-form-item prop="pass" label="密码">
                    <el-input placeholder="请输入" v-model="form.pass" clearable></el-input>
                </el-form-item>
                <el-button type="danger" @click="loginCancle">取消</el-button>
                <el-button type="success" @click="submitValidate('form')" >确定</el-button>
                <!-- 
                <el-switch v-model="form.validateCode"></el-switch>
                 -->
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    props:['dialogVisible'],
    data() {
        var nameCheck = (rule, value, callback) =>{
            if(value != 'lgl_'){
                return callback(new Error('用户名不正确'));
            }
            callback();
        };
        var passCheck = (rule, value, callback) =>{
            if(value != 'admin'){
                return callback(new Error('密码不正确'));
            }
            callback();
        };
        return {
            form: {
                name: '',
                pass: '',
                validateCode: ''
            },
            rules:{
                name:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 4, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' },
                    { validator : nameCheck , trigger : blur }
                ],
                pass:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' },
                    { validator : passCheck , trigger : blur }
                ]
            }
        };
    },
    methods: {
        loginCancle:function() {
            this.$emit('cancal');
        },
        submitValidate(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('success');
                } else {
                    return false;
                }
            });
        }
    }
}
</script>
<style>
    .inputForm{
        width: 100%;
        height: 100%;
    }
    form{
        text-align: center; 
    }
    
</style>
