<template>
  <div class="main-panel ">
    <div class="content-wrapper">
      <div class="ma-3 pa-2 d-flex justify-center align-center sort">
      <v-btn @click="search = !search" class="mr-1" small><v-icon color="black">mdi-file-find</v-icon>Search Founder by name</v-btn>
    </div>
      <div class="pa-2 d-flex justify-center align-center">
      <v-text-field @input="searchFounders" v-model="searchWord" type="text" v-if="search"  prepend-inner-icon="mdi-file-find" class="search" placeholder="Search Founders By Name">
      </v-text-field>
    </div>
      <p class="card-title text-h5 text-center pa-3">{{title}}</p>

      <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">

              <div class="row">
                <div class="col-12">
                  <div class="table-responsive">
                    <table id="example" class="display expandable-table" style="width:100%">
                      <thead>
                        <tr>
                          <th>Founder Fullname</th>
                          <th>Business Name</th>
                          <th>Email Address</th>
                          <th>Phone</th>
                          <th>Gender</th>
                          <th>Qualifications</th>
                          <th>Actions</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="founder in founders" :key="founder.id">
                          <th class="pa-2">{{founder.firstName}} {{founder.lastName}}</th>
                          <th>{{getAocBusiness(founder.businessId)}}</th>
                          <th class="pa-2">{{founder.email}}</th>
                          <th class="pa-2">{{founder.phone}}</th>
                          <th class="pa-2">{{founder.gender}}</th>
                          <th class="pa-2">{{founder.qualification}}</th>
                          <th class="pa-2"><button @click="editFounder(founder.id)" small text fab>
                              <v-icon>mdi-pencil</v-icon>
                            </button></th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>

    <v-dialog v-model="showfoundersDialog" fullscreen transition="dialog-bottom-transition">

      <v-card style="overflow:hidden;">

        <v-toolbar dark color="blue" class="">

          <v-toolbar-title>Founder Info</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="showfoundersDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form ref="founderform">
          <section class="main_form ma-3">
            <v-row class="mt-2">
              <v-col cols="12">
                <h3>Founder(s)</h3>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model.trim="dform.firstName" filled :rules="nameRules">
                  <template #label>
                    <i>First Name <span class="error--text">*</span> </i>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model.trim="dform.lastName" filled :rules="nameRules">
                  <template #label>
                    <i>Last Name<span class="error--text">*</span> </i>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model.trim="dform.email" filled :rules="emailRules">
                  <template #label>
                    <i>Email<span class="error--text">*</span> </i>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field type="number" :rules="phoneRules" v-model="dform.phone" filled color="success" dense>
                  <template #label>
                    <i>Phone Number<span class="error--text">*</span> </i>
                  </template>
                  >
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model.trim="dform.address" filled :rules="messageRules">
                  <template #label>
                    <i>Contact Address <span class="error--text">*</span> </i>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-radio-group v-model.trim="dform.gender" dense row required :rules="messageRules">
                  <span class="mr-3">Gender <span class="error--text">*</span> : </span>
                  <v-radio label="Male" value="Male" color="success"></v-radio>
                  <v-radio label="Female" value="Female" color="success"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="dform.dob" :max="founderDate" filled type="date" dense required
                  :rules="messageRules">
                  <template #label>
                    <i>Date of Birth <span class="error--text">*</span> </i>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-radio-group v-model.trim="dform.position" dense row required :rules="messageRules">
                  <span class="mr-3">Position <span class="error--text">*</span>:
                  </span>
                  <v-radio label="Founder" value="Founder" color="success"></v-radio>
                  <v-radio label="Co-Founder" value="Cofounder" color="success"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" md="6">
                <v-radio-group v-model.trim="dform.religion" dense row required :rules="messageRules">
                  <span class="mr-3">Religion <span class="error--text">*</span>:
                  </span>
                  <v-radio label="Christian" value="Christian" color="green"></v-radio>
                  <v-radio label="Islam" value="Islam" color="green"></v-radio>
                  <v-radio label="Others" value="Others" color="green"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="12" md="6">
                <v-select v-model.trim="dform.qualification" filled :items="qualifications" label="Qualifications"
                  :rules="messageRules">
                </v-select>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model.trim="dform.discipline" v-if="showCourseStudied" filled :rules="messageRules">
                  <template #label>
                    <em>Course of study <span class="error--text">*</span> </em>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-if="showCourseStudied" v-model.trim="dform.institution" filled :rules="messageRules">
                  <template #label>
                    <i>Name of Institute <span class="error--text">*</span> </i>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-if="showCourseStudied" v-model.trim="dform.graduationYear" filled :rules="messageRules">
                  <template #label>
                    <i>Year of graduation <span class="error--text">*</span> </i>
                  </template>
                </v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-radio-group v-if="showCourseStudied" v-model="dform.nyscCompleted" dense row required
                  :rules="messageRules">
                  <span class="mr-3">Nysc Completed <span class="error--text">*</span> :
                  </span>
                  <v-radio label="Yes" value="Yes" color="success"></v-radio>
                  <v-radio label="No" value="No" color="success"></v-radio>
                  <v-radio label="Exempted" value="Exempted" color="success"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>


            <p class="text-end mt-4 mt-md-16">
              <v-btn class="mr-3 white--text" color="blue" @click="updateFounder" :loading="loading" small> save changes
              </v-btn>
            </p>
          </section>
        </v-form>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {UpdateADoc, onSnapshot, alluser } from '@/Auth/index';
import { bus } from "@/main.js";
import { snackMixin, rulesMixin } from "@/mixins";
import { mapState } from "vuex";
export default {
  name: "AllFounders",
  props: ['currAdmin', 'allFounders'],
  mixins: [snackMixin, rulesMixin],
  data: () => ({
    title: 'All Founders',
    business: [],
    founders: [],
    dform: {},
    showfoundersDialog: false,
    searchWord: '',
    search: false
  }),

  methods: {
    getAocBusiness(businessId) {
      let singleBusiness = this.business.find((business) => business.businessId == businessId)
      if (!singleBusiness) {
        return "No Business Found"
      }
      return singleBusiness.businessName
    },
    editFounder(id) {
      this.dform = this.allFounders.find((e) => { return e.id == id })
      this.showfoundersDialog = true
    },
    async updateFounder() {
      if (this.$refs.founderform.validate()) {
        try {
          this.loading = true
          await UpdateADoc.update("founderInfo", this.dform.id, this.dform)
          this.loading = false
          bus.$emit("snackbar", { msg: "Founder Updated Succesfully", color: "success" });
        } catch (err) {
          this.loading = false
          bus.$emit("snackbar", { msg: "Error Eccoured", color: "error" });
        }
      }
    },


    getBusiness() {
      onSnapshot(alluser("business"), (snapshot) => {
        this.business = []
        snapshot.forEach((doc) => {
          this.business.push({ ...doc.data(), id: doc.id });
        });
      })
    },
    getFounders() {
      onSnapshot(alluser("founderInfo"), (snapshot) => {
        this.founders = []
        snapshot.forEach((doc) => {
          this.founders.push({ ...doc.data(), id: doc.id });
        });
      })
    },
    searchFounders(){
      this.founders = this.filteredFounders
    },
    

  },
  created() {
    this.getBusiness()
    this.getFounders();
  },
  computed:{
    ...mapState(["qualifications"]),
    founderDate() {
      let now = new Date()
      let maxDate = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate())
      return maxDate.toISOString().substring(0, 10);
    },
    showCourseStudied() {
      return this.dform.qualification != '' && this.dform.qualification != "None" && this.dform.qualification != "SSCE" && this.dform.qualification != "Others"
    },
    filteredFounders(){
      return this.allFounders.filter((founder)=>{
       let founderName =  founder.firstName.toLowerCase();
       return  founderName.match(this.searchWord.toLowerCase())
      })
    },

  }

}
</script>

<style>

</style>