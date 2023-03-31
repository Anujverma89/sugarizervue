var Listview={
    template:`<div class="canvas-first-child">
                    <div v-for="a in activitesList" class="activity-main-row">
                        <div class="select-favourite" @click="addToFav">
                            
                        </div>
                        <div class="activity-icon-name">
                            <div class="activity-icon" @click="openActivity(a.name)"> <img src="a.icon" :alt="a.name" class="activity-icon-image"></div>
                            <div class="activity-name">{{a.name}}</div>
                        </div>
                        <div class="activity-version">Version {{a.version}}</div>
                        <div class="acitvity-help-icon"></div>
                    </div>
            </div>`,
    props:{
        user:{}
    },
    data(){
        return{
            activitesList:[],
        }

    },
    methods:{
        addToFav(){
            alert("Adding to fav");
        },
        openActivity($event){
            alert(`opening${$event}`);
        }
    },
    mounted(){
        var localActivites=JSON.parse(localStorage.getItem("sugar_settings"));
        for(i in localActivites.activities){
            this.activitesList[i]=localActivites.activities[i];
        };
    }
}