var Journal={
    components:{
        "Search":Search,
    },
    template:`<div>
                    <!--show if checkbox not selected-->
                    <div class="journal-toolbar" v-if="!isEditNavBar">
                        <div class="left-journal-nav">
                            <Search :placeholder="placeHolder"/>
                            <div class="favourite-view-journal select-toolbar"></div>
                            <div class="type-filter-journal-box journal-main-toolbar">
                                <div class="type-filter-journal select-toolbar"></div>
                                <div>All</div>
                            </div>
                            <div class="date-filter-journal-box journal-main-toolbar">
                                <div class="date-filter-journal select-toolbar"></div>
                                <div>Anytime</div>
                            </div>
                            <div class="journal-main-toolbar sort-filter-box">
                                <div class="sort-filter-journal select-toolbar">
                                </div>
                            </div>
                            <div class="splitbar"></div>
                            <div class="copy-fromdevice-jorunal select-toolbar"> </div>
                            <div class="splitbar"></div>
                            <div class="journal-tutorial-icon toolbutton"></div>
                        </div>
 
                        <div class="toolbutton home-view-icon" @click="this.$emit('closejournal')"></div>
                    </div>

                    <!--Show is checkbox is selected-->
                    <div class="journal-toolbar" v-if="isEditNavBar">
                        <div class="left-journal-nav-sub">
                            <div class="first-split-left">
                                <div class="unselect-all-journal select-toolbar"></div>
                                <div class="select-all-journal select-toolbar"></div>
                            </div>
                            <div class="splitbar"></div>
                            <div class="second-split-right">
                                <div class="copy-remote-journal select-toolbar"></div>
                                <div class="copy-shared-journal select-toolbar"></div>
                                <div class="copy-device-icon select-toolbar"></div>
                                <div class="duplicate-view-journal select-toolbar"></div>
                                <div class="erase-view-journal select-toolbar"></div>
                            </div>
                            <div class="splitbar"></div>
                            <div class="show-count-of-selected-third-split">1 selected on 40</div>
                        </div>
                    </div>


                    <div class="journal-body-div">
                        <div v-for="d in journalData" class="journal-activity-row">
                            <div class="row-right-side-journal-activity">
                                <div class="star-and-checkbox-journal">
                                    <div class="select-activity-journal">    
                                        <input type="checkbox" value="check" v-model="checkValue" name="checkfor" @click="dosomework(this.value)" class="checkbox-style" /> 
                                    </div>
                                    <div>        
                                        <div class="mark-fav-icon"></div>
                                    </div>
                                </div>
                                
                                <div class="activity-icon-journal">
                                    icon
                                </div>
                                <div class="activity-name-journal">
                                    {{d.insensitive}}
                                </div>
                            </div>

                            <div class="row-right-side-journal-timestamp">
                                <div class="timestamp-journal">
                                    <p class="timestamp-journal">few minutes ago</p>
                                </div>
                                <div class="go-to-activity-journal">
                                    <div class="go-right-open-acitivity"></div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="journal-bottom-nav">
                        <div class="left-bottom-journal-icons">
                            <div class="show-journal-bottom toolbutton"></div>
                            <div class="show-cloud-one-bottom toolbutton"></div>
                            <div class="show-cloud-all-bottom toolbutton"></div>
                        </div>
                        <div class="center-sync-journal-icon toolbutton">
                        </div>

                        <div class="right-bottom-journal-icons" v-if="ifJournalDataOverflow">
                            <div class="go-left-journal-bottom"></div>
                            <div class="pagination-center-journal-bottom">1/3</div>
                            <div class="go-right-journal-bottom"></div>
                        </div>
                    </div>
            </div>`,
    props:{
        placeHolder:"",
        userr:{},
    },
    data(){
        return{
            time:24,
            checkValue:[],
            isEditNavBar:false,
            ifJournalDataOverflow:false,
            journalData:[],
            createdTime:[],
        }
    },
    methods:{
        dosomework:function(value){
    
        }
    },
    watch:{
        checkValue:function(now,prev){
            if(now.length != 0){
                this.isEditNavBar=true;
            }else{
                this.isEditNavBar=false;
            }
        }
    },
    mounted(){
        axios.get(`https://server.sugarizer.org/api/v1/journal/${this.userr.privateJournall}?limit=100&sort=-timestamp`,{
                headers:{
                    "Content-Type": "application/json",
                    "X-Access-token":this.userr.accessToken,
                    "X-key": this.userr.accessKey,
                }
        }).then((res)=>{
            for(i in res.data.entries){
               this.journalData[i]=res.data.entries[i];
            }
        },error=>{
            console.log(error);
        })
    }
}