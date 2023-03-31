/**
//@setMainscreen is even that emits after verification of user
//isActive:true hides the newuser and login and opens the form
//ishiden:false opens the bottom next and back button
*/

var Firstscreen={
    components:{
        "Password":Password,
        "Ownericon":Ownericon,
    },
    template:`<div> 
                    <div class="first-help">
                       
                        <div class="start-tutorial-class" @click="begin($event)"
                            v-if="isFirstLoad"
                            data-title="Help me"
                            data-intro="Remind you this icon. If you're lost, just click on it anytime anywhere to get some help.">
                        </div>

                        <div class="start-tutorial-class" @click="begin($event)" v-if="!isFirstLoad">
                        </div>
                    </div>

                    <div class="user-div">
                        <div 
                            v-if="!isActive" 
                            class="newuser box-design" 
                            @click="showname('userName')" 
                            data-title="New user"
                            data-intro="First, you need a user to associate your content. Click here if it's your first time in Sugarizer so you could create a new user." >
                            <img src="./icons/newuser-icon.svg" alt="Newuser Icon">
                        </div>
                        <div  v-if="!isActive"
                            class="login box-design" @click="showname('login')" 
                            data-title="User login"
                            data-intro="You've already created a Sugarizer user on a server? Click here to give your login information.">
                            <img src="./icons/login.svg" alt="Login Icon">
                        </div>
                        <div class="historybox "  v-if="isHistory">
                            <div class="inner-history-div" v-for="h in historyUsers">
                            <div class="history-user-icon" ></div>
                            {{h.name}}
                            
                            </div>
                        </div>
                        
                        <!--User name form -->
                        <div  class="show-form" 
                                v-if="isUserName"
                                data-intro="The name you will use in the application. It could be your full name or anything you want. You could change it later."
                                data-title="Choose a name">
                            <div>
                                <label>{{formLabel}}</label>
                            </div>
                            <div>
                                <input type="text" v-model="username" :class="{'form-focus':isNull}" @keyup.enter="goNext" class="username-form">
                            </div>
                        </div>

                        <!-- password field-->
                        <Password v-if="isPassword" :sendPassword="submitPassword" @passwordSet="valiDatePass($event)"
                            data-title="Choose a password"
                            data-intro="Choose a series of images that you will use as password to protect your content. You could change it later but don't forget it!"
                        />

                        <!--Change the user colour-->
                        <div class="change-user-color-parent-div" v-if="ischooseUserColor"
                            data-title="Choose your colors"
                            data-intro="Click here to choose your favorite colors for icons. Don't worry you will be able to change it later if you change your mind.">
                            <div class="click-to-change">
                                click to change color
                            </div>
                            <div class="choose-user-color-scroll" @click="makeColorArray">
                                <Ownericon v-for="color in xoColorArr" :fill_color="color.fill_color" :stroke_color="color.stroke_color"/>
                            </div>
                          
                        </div>


                        <!--Server connection address form-->
                        <div :class="{'get-server-addr':getServerAddr}" class="get-server-none">
                            <div>
                                <label>Server address:</label>
                            </div>
                            <div> 
                                <input type="url" v-model="url" :class="{'form-focus':isNull}" class="username-form">
                            </div>
                        </div>
                    
                    </div> 

                    <div class="spinnerDiv" v-if="isSpinner">
                            <div class="spinner-border" style="width: 4rem; height: 4rem;" role="status">
                            <span class="sr-only">Loading...</span>
                            </div>
                    </div>

                    <div class="bottom-nav" v-if="!isHidden">

                        <div class="first-rightbutton icon-button" data-title="Go next" data-intro="Validate your choice and go to the next step.">
                            <div @click="goNext" class="next-icon" ></div>
                            <div class="icon-text">Next</div>
                        </div>

                        <div class="error-code" :class="{'show-error':isError}">
                            <div class="icon"></div>
                            <div>{{errorText}}</div>
                        </div>
                        <div class="first-leftbutton icon-button"
                            data-intro="You're not sure of your previous choice? Not a problem, just go back to the previous step."
                            data-title="Go back"
                            >
                            <div @click="goBack" class="back-icon" ></div>
                            <div class="icon-text">Back</div>
                        </div>
                    </div> 
                </div>`,
    data(){
        return{
            nativeXoColor:"#ad123f",
            nativeXoStroke:"#ff123a",
            isSpinner:false,
            //false
            isActive:false,
            formLabel:"",
            //true
            isHidden:true,
            isUserName:false,
            username:"",
            password:"",
            url:"https://server.sugarizer.org",
            isNull:false,
            //local mode is true if it is running as desktop application or in devleopment env
            localMode:true,
            getServerAddr:false,
            //this is false by default in development environment
            serverConnection:false,
            validUserName:false,
            errorText:"USer not found",
            isError:false,
            userAlreadyExit:false,
            isLogin:false,
            isHistory:false,
            isPassword:false,
            ischooseUserColor:false,
            whichForm:"",
            submitPassword:false,
            xoColorArr:[],
            isFirstLoad:true,
            xoIndex:0,
            accessToken:'',
            accessKey:'',
            historyUsers:[]
        }
    },
    methods: {
        begin($event){
            if(this.isFirstLoad==true){
                console.log($event.srcElement.attributes)
            }
            introJs().start();
        },
        showname(item){
            if(item=="login"){
                if(this.localMode==true){
                    this.getServerAddr=true;
                    this.isActive=true;
                    this.isHidden=false;
                    this.isFirstLoad=false;
                    this.isHistory=false;
                }else{
                    this.isLogin=true;
                    this.isActive=true;
                    ttruehis.isHidden=false;
                    this.isUserName=true;
                    this.formLabel="Name:";
                    this.isFirstLoad=false;
                    this.isHistory=false;
                }
                // this.formLabel="Name:"
            }else if(item=="userName"){
                this.formLabel="Choose name:"
                this.isActive=true;
                this.isHidden=false;
                this.isUserName=true;
                this.isFirstLoad=false;
                this.isHistory=false;
            }
          
        },
        goBack(){
            if(this.isUserName==true && this.isLogin == true){
                this.isUserName=false;
                this.isLogin=false;
                this.getServerAddr=true;
                this.isHidden=false;
                this.username="";
                this.isHistory=false;
            }else if(this.getServerAddr==true){
                this.getServerAddr=false;
                this.isActive=false;
                this.isLogin=false;
                this.isHidden=true;
                this.isHistory=true;
            }else if(this.isPassword==true){
                this.isHidden=false;
                this.isUserName=true;
                this.username="";
                this.isPassword=false;
                this.isHistory=false;
            }else if(this.ischooseUserColor==true){
                this.ischooseUserColor=false;
                this.isHidden=false;
                this.isPassword=true;
                this.isActive=true;
                this.isHistory=false;
                this.ischooseUserColor=false;
            }else if(this.isUserName==true){
                this.isUserName=false;
                this.isHidden=true;
                this.isActive=false;
                this.isHistory=true;
            }else if(this.isLogin==true){
                this.isLogin=false;
                this.isHidden=true;
                this.isHistory=false;
                this.isActive=false;
            }

        },
        valiDatePass($event){
            if(this.whichForm=="login"){
                this.isSpinner=true;
                axios.post('https://server.sugarizer.org/auth/login',{
                        user:JSON.stringify({
                            name:this.username,
                            password:$event,
                            role:["student","teacher"]
                        })
                }).then((res)=>{
                    axios.get('https://server.sugarizer.org/api/v1/activities',{
                            headers:{
                                "Content-Type": "application/json",
                                "X-Access-token":res.data.token,
                                "X-key": res.data.user._id,
                            },
                    }).then((activities)=>
                        {
                            user=JSON.stringify({
                                "activities":activities.data,
                                "colorValue":{
                                    fill:res.data.user.color.fill,
                                    stroke:res.data.user.color.stroke,
                                },
                                "connected":true,
                                "language":res.data.user.language,
                                "name":res.data.user.name,
                                "networkId":res.data.user._id,
                                "options":{
                                    stats:res.data.user.options.stats,
                                    sync:res.data.user.options.sync
                                },
                                "privateJournal":res.data.user.private_journal,
                                "sharedJournal":res.data.user.shared_journal,
                                "token":{
                                    access_token:res.data.token,
                                    x_key:res.data.user._id,
                                }

                            })
                            localStorage.setItem("sugar_settings",user);
                            this.$emit('goToView',{
                                'openPage':'openMainPage',
                            });
                            this.isSpinner=false;
                        })
                    .catch((err)=>{
                        console.log(err);
                        this.isSpinner=false;
                    })
                   
                }).catch((err)=>{
                    this.isSpinner=false;
                    this.isError=true;
                    this.errorText="Invalid user name or images";
                })
			}else{
                //creating new user 
                this.password=$event;
				this.isPassword=false;
                this.ischooseUserColor=true;
			}	
        },
        goNext($event){
            if(this.isUserName==true){
                if(this.isLogin==true){
                    this.whichForm="login";
                    if(this.username==""){
                        this.isNull=true;
                    }else{
                        this.isSpinner=true;
                        axios({
                            method:'POST',
                            url:'https://server.sugarizer.org/auth/signup',
                            data:{
                                user:JSON.stringify({
                                    name:this.username,
                                    role:"student",
                                    beforeSignup:true,
                                })
                            },
                        }).then((res)=>{
                            if(res.data.exists==false){
                                this.errorText="Unknown user";
                                this.isError=true;
                                this.isSpinner=false; 
                            }
                        })
                        .catch((err)=>{
                            if(err.response.data.exists==true){
                                this.isUserName=false;
                                this.isPassword=true;
                                this.isSpinner=false;
                            }
                        })  
                    }
                    
                }else{
                    if(this.username==""){
                        this.isNull=true;
                    }else{
                        this.isSpinner=true;
                        axios({
                            method:'POST',
                            url:'https://server.sugarizer.org/auth/signup',
                            data:{
                                user:JSON.stringify({
                                    name:this.username,
                                    role:"student",
                                    beforeSignup:true,
                                })
                            },
                        }).then((res)=>{
                            if(res.data.exists==false){
                                this.isUserName=false;
                                this.isPassword=true;
                                this.isSpinner=false;
                            }
                        })
                        .catch((err)=>{
                            if(err.response.data.exists==true){
                                this.errorText="User already exist";
                                this.isError=true;
                                this.isSpinner=false;
                            }
                        })  
                    }
                }
                    
            }else if(this.getServerAddr==true){
                if(this.url==""){
                    this.isNull=true;
                }else if(this.url == "https://server.sugarizer.org" || this.url == "http://server.sugarizer.org"){
                    //connectin server
                    this.isSpinner=true;
                    axios.get("https://server.sugarizer.org/api")
                    .then((res)=>{
                        if(res.status=200){
                            this.getServerAddr=false;
                            this.isUserName=true
                            this.formLabel="Name:";
                            this.isLogin=true;
                            this.isSpinner=false;
                        }else{
                            console.error(res);
                            // this.isSpinner=false;
                        }
                    })
                    .catch(err=>console.error(err));
                    // this.isSpinner=false;
                   
                }else{
                    this.errorText="Remote server not responding";
                    this.isError=true;
                    // this.isSpinner=false;
                }
            }else if(this.isPassword==true){
                    this.submitPassword=true;
            }else if(this.ischooseUserColor==true){
                    this.nativeXoColor=Xocolor[this.xoIndex-1].fill_color;
                    this.nativeXoStroke=Xocolor[this.xoIndex-1].stroke_color;
                    axios.post('https://server.sugarizer.org/auth/signup',{
                        user:JSON.stringify({
                            name:this.username,
                            color:{
                                stroke:this.nativeXoStroke,
                                fill:this.nativeXoColor,
                            },
                            language:'en',
                            role:'student',
                            password:this.password,
                            options:{
                                sync:true,
                                stats:true,
                            }
                        })
                    })
                    .then((res)=>{
                        this.ischooseUserColor=false;
                        this.whichForm='login';
                        this.valiDatePass(this.password)
                    })
                    .catch((err)=>{
                        console.log(err);
                        this.isError=true;
                        this.errorText=err;
                    })
            }
        },
        makeColorArray(){
           this.xoColorArr[0]=Xocolor[this.xoIndex];
           this.xoIndex++;
        },
        
    },

    watch:{
        username:function(value,prev){
            if(value != prev){
                this.isError=false;
                this.userAlreadyExit=false;
                this.validUserName=false;
            }
        },
        password:function(value,prev){
            if(value != prev){
                this.isError=false;
            }
        },
        url:function(value,prev){
            if(value != prev){
                this.isError=false;
            }
        }
    },
    mounted(){
        this.makeColorArray();
        var hist=localStorage.getItem("sugar_history");
        var parsed=JSON.parse(hist);
        if(hist != null){
            this.isHistory=true;
            for(p in parsed){
                
                this.historyUsers[p]=parsed[p];
            }
        }
    }
}
