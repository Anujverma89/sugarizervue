var Homeview={
    
    components:{
        "Dialog":Dialog,
        "Ownericon":Ownericon
    },
    template:`  <div class="canvas-inner">

                    <Dialog :showDialog="openDailogBox" :user="user"
                            @onCancel="closeSettingDailog"/>
                    
                    <div class="xo-and-journal-outer">
                        <div class="xo-user-icon open-tool-hover" @mouseover="showToolOption" @mouseleave="closeToolOption">

                            <Ownericon :fill_color="user.xoColor" :stroke_color="user.xoStroke"/>

                            <div class="tool-options" v-if="showTool">
                                <div class="user-icon-name general-tool" @click="openSettingDialog">
                                    <div class="user-icon-logo-colored general-tool-child"></div>
                                    <div>{{user.username}}</div>
                                </div>
                                <div class="horizontal-row "></div>
                                <div class="setting-logoff general-tool" @click="openSettingDialog">
                                    <div class="my-settings-icon general-tool-child"></div>
                                    <div>My Settings</div>
                                </div>
                                <div class="setting-logoff general-tool" @click="logout">
                                    <div class="logoff-icon general-tool-child"></div>
                                    <div>Logoff</div>
                                </div>
                            </div>
                        
                        </div>
                        <div class="journal-icon" @click="this.$emit('openpage','journal')"></div>
                    </div>

                   


                </div>`,
    props:{
        user:{},
    },
    data(){
        return{
            showTool:false,
            toolTipOn:false,
            openDailogBox:false,
            timer:'',

        }
    },
    methods:{
        showToolOption(){
            if(this.showTool==true){
                return;
            }else{
                this.timer=setTimeout(()=>{
                    this.showTool=true;
                    this.toolTipOn=true;
                },1000)
            }
        },  
        closeToolOption(){
            if(this.toolTipOn == true){
                setTimeout(()=>{
                    this.showTool=false;
                    this.toolTipOn=false;
                },1000)
            }{
                clearTimeout(this.timer);
            }
        },

        openSettingDialog(){
            this.openDailogBox=true;
            this.showTool=false;
            this.toolTipOn=false;
        },
        closeSettingDailog(){
            this.openDailogBox=false;
        },
        logout(){
            this.$emit("logout");
        }
    },
    mounted(){
    }

}