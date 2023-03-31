/**
 * @module Dialog
 * @desc This is an modal component for different settings overlay pages
 * @vue-prop {Boolean} [searchField=null] - to show search-bar in the toolbar
 * @vue-prop {Boolean} [okButton=null] - to show ok button in the toolbar
 * @vue-prop {Boolean} [cancelButton=null] - to show cancel button in the toolbar
 * @vue-prop {String} [iconData=null] - stores the url of svg file of icon in the toolbar
 * @vue-prop {String} [titleData=null] - stores the title text of feature page in the toolbar
 * @vue-data {Boolean} [showDialog=false] - condition to show or hide the dialog modal
 * @vue-event {} onCancel - emit cancel event to close the dialogBox
 * @vue-event {} onOk - emit ok event to save the changes and close the dialogBox
 * @vue-event {String} searchInput - emit inputString of the search-bar whenever its changes 
 */


const Dialog ={
	components:{
		"Icon":Icon,
		"Search":Search,
	},
	template: `
		<div v-if="showDialog" class="modal-overlay" @click="cancelClicked">
			<div class="modal" @click.stop>
				<div class="dialog-content">
					<div class="toolbar">
						<div v-if="iconData" class="module-icon">
							<icon id="37" :svgfile="this.iconData" color="256" x="4" y="4" size="40"></icon>
						</div>
						<div v-if="titleData" class="module-text">{{titleData}}</div>
						<Search class="settings-filter-text"
							placeholder="Search in settings"
							v-on:input-changed="searchSettings($event)">
						</Search>
						<div class="toolbutton module-cancel-button" @click="cancelClicked"></div>
						<div class="toolbutton module-ok-button" v-if="!isMainContentView" @click="okClicked"></div>
					</div>
					<div class="main-content-box" v-if="isMainContentView">
						<div class="content-box">
							<div class="conent-icon about-me-icon" id="aboutMe" @click="openNativeSetting($event)"></div>
							<div class="content-text">About me</div>
						</div>
						<div class="content-box">
							<div class="conent-icon about-mycomputer-icon" id="myComputer" @click="openNativeSetting($event)"></div>
							<div class="content-text">About by computer</div>
						</div>
						<div class="content-box">
							<div class="conent-icon about-myserver-icon" id="myServer" @click="openNativeSetting($event)"></div>
							<div class="content-text">About my server</div>
						</div>
						<div class="content-box">
							<div class="conent-icon about-mysecurity-icon" id="mySecurity" @click="openNativeSetting($event)"></div>
							<div class="content-text">My security</div>
						</div>
						<div class="content-box">
							<div class="conent-icon about-myprivacy-icon" id="myPrivacy" @click="openNativeSetting($event)"></div>
							<div class="content-text">My privacy</div>
						</div>
						<div class="content-box">
							<div class="conent-icon about-mylangauge-icon" id="myLanguage" @click="openNativeSetting($event)"></div>
							<div class="content-text">Language</div>
						</div>
					</div>
						<!--main content box-->
					<div class="aboutme-setting-content setting-native-view" v-if="isAboutMeSetting">
								About me 
					</div>
					<div class="aboutmy-computer-conter setting-native-view" v-if="isMyComputerSetting">
								About my computer
					</div>	
					<div class="aboutmy-server-content setting-native-view" v-if="isMyServerSetting">
								About my server
					</div>
					<div class="aboutmy-my-security setting-native-view" v-if="isMySecuritySetting">
								About my security	
					</div>
					<div class="aboutmy-my-privacy setting-native-view" v-if="isMyPrivacySetting">
								About my private
					</div>
					<div class="aboutmy-my-laguage setting-native-view" v-if="isMyLanguageSetting">
								About my lanuage 
					</div>

				</div>	
			</div>
		</div>
	`,
	props: {
		user:{},
		showDialog:false,
		iconData:false,
		titleData:false,
			// ['searchField', 'okButton', 'cancelButton', 'iconData', 'titleData','showDialog',],
	},

	data() {
		return {
			isSubDialog:false,
			isMainContentView:true,
			isAboutMeSetting:false,
			isMyComputerSetting:false,
			isMyServerSetting:false,
			isMySecuritySetting:false,
			isMyPrivacySetting:false,
			isMyLanguageSetting:false,
		}
	},
	methods: {
		cancelClicked() {
			this.$emit('onCancel');
		},
		okClicked() {
			this.isMainContentView=true;
			this.isAboutMeSetting=false;
			this.isMyComputerSetting=false;
			this.isMyServerSetting=false;
			this.isMySecuritySetting=false;
			this.isMyPrivacySetting=false;
			this.isMyLanguageSetting=false;
		},
		searchSettings(query) {
			this.$emit('searchInput',query)
		},
		openNativeSetting($event){
			var targetId=$event.target.id;
			switch(targetId){
				case "aboutMe":
								this.isMainContentView=false;
								this.isAboutMeSetting=true;
								this.isMyComputerSetting=false;
								this.isMyServerSetting=false;
								this.isMySecuritySetting=false;
								this.isMyPrivacySetting=false;
								this.isMyLanguageSetting=false;
								
				case "myComputer":
					this.isMainContentView=false;
								this.isAboutMeSetting=false;
								this.isMyComputerSetting=true;
								this.isMyServerSetting=false;
								this.isMySecuritySetting=false;
								this.isMyPrivacySetting=false;
								this.isMyLanguageSetting=false;
				case "myServer":
					this.isMainContentView=false;
								this.isAboutMeSetting=false;
								this.isMyComputerSetting=false;
								this.isMyServerSetting=true;
								this.isMySecuritySetting=false;
								this.isMyPrivacySetting=false;
								this.isMyLanguageSetting=false;
				case "mySecurity":
					this.isMainContentView=false;
								this.isAboutMeSetting=false;
								this.isMyComputerSetting=false;
								this.isMyServerSetting=false;
								this.isMySecuritySetting=true;
								this.isMyPrivacySetting=false;
								this.isMyLanguageSetting=false;
				case "myPrivacy":
					this.isMainContentView=false;
								this.isAboutMeSetting=false;
								this.isMyComputerSetting=false;
								this.isMyServerSetting=false;
								this.isMySecuritySetting=false;
								this.isMyPrivacySetting=true;
								this.isMyLanguageSetting=false;
				case "myLanguage":
					this.isMainContentView=false;
								this.isAboutMeSetting=false;
								this.isMyComputerSetting=false;
								this.isMyServerSetting=false;
								this.isMySecuritySetting=false;
								this.isMyPrivacySetting=false;
								this.isMyLanguageSetting=true;
			}
		}
	},
	mounted(){
		
	}
};

