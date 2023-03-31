requirejs.config({
    baseUrl:"lib",
    paths:{
        // activites:"../js",
    }
})


const app=Vue.createApp({
    components:{
        "Navigation":Navigation,
        "Firstscreen":Firstscreen,
        "Password":Password,
        "Homeview":Homeview,
        "Listview":Listview,
        "Neighbourhoodview":Neighbourhoodview,
        "Search":Search,
        "Journal":Journal
    },
    template:`
            <!-- Navigation-->
            <div :class="{'main-toolbar':isMainScreen}" v-if="isMainScreen">
                <Navigation @openpage="changeview($event)" :searchPlaceHolder="placeholderData"/>          
            </div>


            <!--Main screen view-->
            <div class="canvas" :class="{'list-and-journal-view-canvas':isListView}" v-if="isMainScreen">
                <Homeview v-if="isRadialView" @openpage="openJournal($event)" :user="user" @logout="logUserOff"/>
                <Listview v-if="isListView" :user="user"/>               
                <Neighbourhoodview  v-if="isNeighbourhood"/>
            </div>
            

            <!--Journal screen-->
            <Journal v-if="isJournalScreen" @closejournal="closeJornal" :placeHolder="placeholderData" :userr="user"/>


            <!--First screen-->
            <div class="first-screen-canvas" v-if="isFirstScreen">
                <div class="firstscreen-toolbar"></div>
                <div class="canvas-inner"><Firstscreen @goToView="openMain($event)"/></div>
            </div>
            `,
    data(){
        return{
            //defualt fisrscreen is true but for dev i have made it true
            isFirstScreen:true,
            //defualt isMainScreen is false but for dev i have made it true
            isMainScreen:false,
            isRadialView:true,
            isNeighbourhood:false,
            isListView:false,
            isJournalScreen:false,
            placeholderData:'Search in home',
            user:{xoColor:"#d5d5d5",
                    xoStroke:"#999999",
                    username:'',
                    accessToken:'',
                    accessKey:'',
                    activites:[],
                    privateJournall:'',
                    sharedJournall:'',
                }
        }
    },
    methods: {
        //we will emit this from firstscreen
        openMain($event){
           var localUser=JSON.parse(localStorage.getItem("sugar_settings"));
            this.user.accessToken=localUser.token.access_token;
            this.user.accessKey=localUser.token.x_key;
            this.user.xoStroke=localUser.colorValue.stroke;
            this.user.xoColor=localUser.colorValue.fill;
            this.user.username=localUser.name;
            this.user.activites=localUser.activities;
            this.user.privateJournall=localUser.privateJournal;
            this.user.sharedJournall=localUser.sharedJournal;
            this.isFirstScreen=false;
            this.isMainScreen=true;
        },
        chooseUserColor(){
            this.isChooseUserColor=true;
            this.showPassword=false;
            
        },
        changeview($event){
            if($event == "listView"){
                this.placeholderData="Search in home";
                this.isNeighbourhood=false;
                this.isRadialView=false;
                this.isListView=true;
            }else if($event=="neighbourhoodView"){
                this.isListView=false;
                this.isRadialView=false;
                this.isNeighbourhood=true;
                this.placeholderData="Search in Neighbourhood";
            }else if($event == "radialView"){
                this.placeholderData="Search in home";
                this.isListView=false;
                this.isNeighbourhood=false;
                this.isRadialView=true;
            }
        },
        openJournal($event){
            this.isMainScreen=false;
            this.isJournalScreen=true;
            this.placeholderData="Search in journal"
        },
        closeJornal(){
            this.isJournalScreen=false;
            this.isMainScreen=true;
            this.placeholderData="Search in home"
        },
        logUserOff(){
            this.isMainScreen=false;
            this.isFirstScreen=true;
            localStorage.removeItem("sugar_settings");
        },
       
    },
    watch:{
        showPassword:function(value){
            
            this.hideFirstScreen= !this.showPassword;
        }
    },
    mounted(){
        var userSetting=localStorage.getItem("sugar_settings");
        var parsedSetting=JSON.parse(userSetting);
        if(parsedSetting != null){
            var localUser=JSON.parse(localStorage.getItem("sugar_settings"));
            this.user.accessToken=localUser.token.access_token;
            this.user.accessKey=localUser.token.x_key;
            this.user.xoStroke=localUser.colorValue.stroke;
            this.user.xoColor=localUser.colorValue.fill;
            this.user.username=localUser.name;
            this.user.privateJournall=localUser.privateJournal;
            this.user.sharedJournall=localUser.sharedJournal;
            this.isFirstScreen=false;
            this.isMainScreen=true;
        } 
    }
 
   
})
app.mount("#app");

    


