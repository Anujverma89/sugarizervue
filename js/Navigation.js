var Navigation={
    components:{
		"Search":Search,
	},
    template:`<div class="main-toolbar-inner">
                    <div class="nav-left-icons">
                        <Search :placeholder="searchPlaceHolder"/> 
                        <div class="toolbutton view-tutoiral-button" 
                            title="Main screen tutorial">
                        </div> 
                        <div class="toolbutton view-sync-button" title="Sync" v-if="isDataNotLoded">
                        </div>
                        <div class="toolbutton view-cloud-button" title="Cloud warning" v-if="isReconnectionReq">
                        </div>
            
                    </div>

                    <div class="nav-right-icons">
                        <div class="toolbutton view-radial-button" 
                            title="Radial view"
                            id="radialView"
                            @click="openRelativeView('radialView')">
                        </div>
                        <div class="toolbutton view-neighbourhood-button" 
                            title="List view"
                            id="neighbourhoodView"
                            @click="openRelativeView('neighbourhoodView')">
                        </div>
                        <div class="toolbutton view-list-button" 
                            title="List view"
                            id="listView"
                            @click="openRelativeView('listView')">
                        </div>
                    </div>
            </div>`,
    props:{
        searchPlaceHolder:"",
    },
    data(){
        return{
           isReconnectionReq:false,
           isDataNotLoded:false,
        }
    },
    methods:{
        openRelativeView(rad){
            this.$emit("openpage",rad);
        }
    },
    watch:{
        searchPlaceHolder:function(){
            console.log(this.searchPlaceHolder);
        }
    }
}