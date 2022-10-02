<template>
  <div class="main-panel">
    <div class="ma-3 pa-2 d-flex justify-center align-center sort">
      <v-btn @click="getAllBusiness" class="mr-1" small>All Businesses</v-btn>
      <v-btn @click="registeredBusiness" class="mr-1" small>Registered Businesses</v-btn>
      <v-btn @click="unRegisteredBusiness" class="mr-1" small>Unregistered Businesses</v-btn>
      <v-btn @click="sectorDialog = true" class="mr-1" small>Sort Business By Sector</v-btn>
      <v-btn @click="search = !search" class="mr-1" small>
        <v-icon color="black">mdi-file-find</v-icon>
      </v-btn>
    </div>
    <div class="pa-2 d-flex justify-center align-center">
      <v-text-field @input="searchBusiness" v-model="searchWord" type="text" v-if="search"
        prepend-inner-icon="mdi-file-find" class="search" placeholder="Search Busines">
      </v-text-field>
    </div>
    <div class="content-wrapper">
      <p class="card-title text-h5 text-center pa-3">{{title}}</p>
      <p class=" text-h6 text-center">Total: {{numberOfBusiness}}</p>
      <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">

            <div class="card-body">

              <div class="table-responsive">
                <table class="table table-striped table-borderless">
                  <thead>
                    <tr>
                      <th>Business Name</th>
                      <th>Business Email</th>
                      <th>Business Sector</th>
                      <th>Registration Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(business, index) in business" :key="index">
                      <td>{{ business.businessName }}</td>
                      <td>{{ business.businessEmail }}</td>
                      <td class="font-weight-bold">{{ business.businessSector }}</td>
                      <td class="font-weight-medium">
                        <div class="badge "
                          :class="registrationBadge(business.businessRegistration, business.founderRegistration).badge">
                          {{
                          registrationBadge(business.businessRegistration, business.founderRegistration).status
                          }}</div>
                      </td>
                      <td>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="getSingleBusiness(business.id)" v-bind="attrs" v-on="on" small fab text>
                              <v-icon small>mdi-open-in-new</v-icon>
                            </v-btn>
                          </template>
                          <span>View Business</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="editBusiness(business.id)" v-bind="attrs" v-on="on" small fab text>
                              <v-icon small>mdi-pencil</v-icon>
                            </v-btn>
                          </template>
                          <span>Edit Business</span>
                        </v-tooltip>

                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <vue-excel-xlsx class="mt-2 text-center" :data="business" :columns="businessData" :filename="title"
      :sheetname="'business sheet'">
      <v-btn small rounded class="white--text" color="primary">
        Export to Excel</v-btn>
    </vue-excel-xlsx>

    </div>
    <!-- dialog to select sectors -->
    <v-dialog transition="dialog-top-transition" max-width="600" v-model="sectorDialog">
      <template>
        <v-card>
          <v-toolbar color="white" dark>
            <p class="black--text body-2">Select the business sector </p>
            <v-spacer></v-spacer>
            <v-btn @click="sectorDialog = false" small fab text>
              <v-icon color="black" small>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="px-8 py-10">
            <v-select v-model="sectorSelected" :items="sectors" filled :rules="messageRules">
              <template #label>
                <i>Business Sector<span class="error--text">*</span> </i>
              </template>
            </v-select>
          </div>


          <v-card-actions class="justify-end">
            <v-btn text @click="selectSector">Sort</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <!-- end of dialog to select sectors -->

    <!-- dialog for business info -->
    <v-dialog v-model="businessInfoDialog" class="cardz" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="blue" class="">
          <v-toolbar-title>Business Overview</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="businessInfoDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="wrap">
          <div class="title-wrap">
            <div
              class="d-flex flex-column flex-md-column flex-sm-column justify-center align-center justify-sm-center ">
              <div class="align-self-center relative mt-2">
                <div class="logo">
                  <v-avatar tile size="9rem">
                    <v-img :src="selectedBusiness.companyLogo" alt="">
                      <template #placeholder>
                        <v-icon large>
                          mdi-account
                        </v-icon>
                      </template>
                    </v-img>
                  </v-avatar>
                </div>
              </div>
              <div class="align-self-center overview align-self-sm-center text-center mt-2">
                <h3>{{selectedBusiness.businessName }}</h3>
                <h4>Business Id: <span class="blue--text"> {{ selectedBusiness.businessId }}</span></h4>
                <p>{{selectedBusiness.businessEmail }}</p>
              </div>
            </div>
          </div>
          <div class="mt-10 relative">
            <v-tabs grow background-color="grey lighten-4 black--text relative" show-arrows>
              <v-tabs-slider color="blue lighten-3"></v-tabs-slider>

              <v-tab v-for="item in items" :key="item.title">
                {{ item.title }}
              </v-tab>
              <v-tab-item>
                <v-card class="px-md-10 px-sm-5 px-3 pt-3 relative" color="basil" flat>
                  <div class="basic">
                    <h2 class="title">Business Overview</h2>
                    <div class="about">
                      <p style="text-align:center">{{selectedBusiness.businessOverview }}</p>

                    </div>
                    <div class="form_card">

                      <div class="line">
                        <h4>Business Name:</h4>
                        <span>{{selectedBusiness.businessName }}</span>
                      </div>
                      <div class="line">
                        <h4>Business Email:</h4>
                        <span>{{selectedBusiness.businessEmail }}</span>
                      </div>
                      <div class="line">
                        <h4>Business Phone:</h4>
                        <span>{{selectedBusiness.businessPhone }}</span>
                      </div>
                      <div class="line">
                        <h4>Business Address:</h4>
                        <span>{{selectedBusiness.businessAddress }}</span>
                      </div>
                      <div class="line">
                        <h4>Business Local Goverment:</h4>
                        <span>{{selectedBusiness.lga }}</span>
                      </div>
                      <div class="line">
                        <h4>Employees:</h4>
                        <span>{{selectedBusiness.employees }}</span>
                      </div>
                      <div class="line">
                        <h4>Year Founded:</h4>
                        <span>{{selectedBusiness.yearFounded }}</span>
                      </div>
                      <div class="line">
                        <h4>Annual Revenue:</h4>
                        <span>{{selectedBusiness.annualRevenue }}</span>
                      </div>
                      <div class="line">
                        <h4>Monthly Revenue:</h4>
                        <span>{{selectedBusiness.monthlyRevenue }}</span>
                      </div>
                      <div class="line">
                        <h4>Is Business Registered :</h4>
                        <span>{{selectedBusiness.businessRegistered }}</span>
                      </div>
                      <div v-if="selectedBusiness.businessRegistered == 'Yes'" class="line">
                        <h4>Business Registration Year:</h4>
                        <span>{{selectedBusiness.yearBusinessRegistered }}</span>
                      </div>
                      <div class="line">
                        <h4>Business Sector:</h4>
                        <span>{{selectedBusiness.businessSector }}</span>
                      </div>
                      <div class="line">
                        <h4>Business Website:</h4>
                        <span>{{selectedBusiness.companyWebsite }}</span>
                      </div>
                      <div class="line">
                        <h4>Business Linkedin Profile:</h4>
                        <span>{{selectedBusiness.linkedin }}</span>
                      </div>
                      <div class="line">
                        <h4>Business Facebook Profile:</h4>
                        <span>{{selectedBusiness.facebook }}</span>
                      </div>
                      <div class="line">
                        <h4>Business Twitter Profile:</h4>
                        <span>{{selectedBusiness.twitter }}</span>
                      </div>
                      <div class="line">
                        <h4>Business Instagram Profile:</h4>
                        <span>{{selectedBusiness.instagram }}</span>
                      </div>
                      <div class="line">
                        <h4>Target Audience:</h4>
                        <span>{{selectedBusiness.targetAudience}}</span>
                      </div>
                      <div class="line">
                        <h4>Problem trying to solve:</h4>
                        <span>{{selectedBusiness.problemBusinessSolved}}</span>
                      </div>
                      <div class="line">
                        <h4>Solution:</h4>
                        <span>{{selectedBusiness.solutionToProblem}}</span>
                      </div>
                    </div>

                    <v-btn @click="editBusiness(selectedBusiness.id)" small color="green text-decoration-none"
                      class="mt-2 ml-2 mb-6">
                      <v-icon left>mdi-pencil</v-icon>
                      Edit Business
                    </v-btn>

                  </div>

                </v-card>
              </v-tab-item>

              <v-tab-item>
                <v-card class="px-md-10 px-sm-5 vcard px-3 pt-6 relative mb-4" height="300" color="basil" flat>
                  <div class="contact" v-if="selectedBusiness.founderRegistration">
                    <div v-for="founder in businessFounders(selectedBusiness.businessId)" :key="founder.id"
                      class="founder">
                      <div class="d-flex flex-column align-items-center justify-center text-center">

                        <v-avatar class="founderImg" size="9rem">
                          <v-img :src="founder.founderImage">
                            <template #placeholder>
                              <v-icon large>
                                mdi-account
                              </v-icon>
                            </template>
                          </v-img>
                        </v-avatar>

                        <div class="mt-3 d-flex justify-center align-center flex-column">
                          <h4>{{ founder.firstName + " " + founder.lastName }}</h4>
                          <p class="text-secondary mb-1">{{ founder.email }}</p>
                          <p class="text-muted font-size-sm">{{ founder.position }}</p>
                          <v-btn @click="editFounder(founder.id)" small text>
                            <v-icon>mdi-pencil</v-icon>Edit Founder
                          </v-btn>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div v-else class="d-flex justify-center align-center">
                    <p class="center-text text-h4 red--text" color="red">No Founders Available</p>
                  </div>

                </v-card>
              </v-tab-item>

            </v-tabs>


          </div>

        </div>
      </v-card>
    </v-dialog>
    <!-- end of dialog of business info -->

    <!-- Dialog to edit individual business -->
    <v-dialog v-model="editBusinessDialog" fullscreen transition="dialog-bottom-transition">
      <v-card style="overflow:hidden;">
        <v-toolbar color="black" dark>
          <p class="text-h5 pa-0 ma-0"> Edit Business Details</p>
          <v-spacer>
          </v-spacer>
          <v-btn @click="editBusinessDialog = false" small fav text>
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-form class="pa-4" ref="form">
          <v-row class="mt-2">
            <v-col cols="12" md="6">
              <v-text-field v-model="dform.businessName" filled :rules="nameRules">
                <template #label>
                  <i>Business Name <span class="error--text">*</span> </i>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="dform.businessEmail" filled :rules="emailRules">
                <template #label>
                  <i>Business Email Address<span class="error--text">*</span> </i>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="dform.businessPhone" type="number" filled :rules="phoneRules">
                <template #label>
                  <i>Business Phone Number <span class="error--text">*</span> </i>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="dform.businessAddress" filled :rules="messageRules">
                <template #label>
                  <i>Business Contact Address <span class="error--text">*</span> </i>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field readonly v-model="dform.state" filled>
                <template #label>
                  <i>State: <span class="error--text">*</span> </i>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="dform.lga" :items="lgas" filled :rules="messageRules">
                <template #label>
                  <i>Local Goverment: <span class="error--text">*</span> </i>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="dform.employees" :items="employees" filled :rules="messageRules">
                <template #label>
                  <i>Number Of Employees<span class="error--text">*</span> </i>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="dform.yearFounded" filled type="date" :max="nowDate" :rules="messageRules">
                <template #label>
                  <i>Year Business Was Founded? <span class="error--text">*</span>
                  </i>
                </template>
              </v-text-field>

            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="dform.annualRevenue" :items="annualRevenue" filled :rules="messageRules">
                <template #label>
                  <i>Annual Business Revenue<span class="error--text">*</span> </i>
                </template>
              </v-select>

            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="dform.monthlyRevenue" :items="averageRevenue" filled :rules="messageRules">
                <template #label>
                  <i>Average revenue per month<span class="error--text">*</span> </i>
                </template>
              </v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-radio-group v-model="dform.businessRegistered" dense row required :rules="messageRules">
                <span class="mr-3">Business Registered ?<span class="error--text">*</span> :
                </span>
                <v-radio label="Yes" value="Yes" color="success"></v-radio>
                <v-radio label="No" value="No" color="success"></v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="12" md="6" v-if="dform.businessRegistered == 'Yes'">
              <v-text-field v-model="dform.yearBusinessRegistered" type="date" :max="nowDate" filled>
                <template #label>
                  <i>What year? <span class="error--text">*</span> </i>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-select v-model="dform.businessSector" :items="sectors" filled :rules="messageRules">
                <template #label>
                  <i>Business Sector<span class="error--text">*</span> </i>
                </template>
              </v-select>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field v-model="dform.companyWebsite" filled>
                <template #label>
                  <i>Company Website </i>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="dform.linkedin" filled>
                <template #label>
                  <i>Linkedin Url</i>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="dform.facebook" filled>
                <template #label>
                  <i>Facebook Url </i>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="dform.twitter" filled>
                <template #label>
                  <i>Twitter Url</i>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="dform.instagram" filled>
                <template #label>
                  <i>Instagram Url </i>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-textarea v-model="dform.businessOverview" filled rows="1" auto-grow :rules="messageRules">
                <template #label>
                  <p>
                    Business Overview<i>
                      (A brief description of what your business is all about)
                      <span class="error--text">*</span>
                    </i>
                  </p>
                </template>
              </v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="dform.targetAudience" filled :rules="messageRules">
                <template #label>
                  <i>
                    Who Are Your Target Audience?
                    <span class="error--text">*</span>
                  </i>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field v-model="dform.problemBusinessSolved" filled :rules="messageRules">
                <template #label>
                  <i>
                    What Problem(s) Is Your Business Trying To Solve?
                    <span class="error--text">*</span>
                  </i>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="dform.solutionToProblem" filled :rules="messageRules">
                <template #label>
                  <i>
                    What Are Your Solutions To The Problem(s)?
                    <span class="error--text">*</span>
                  </i>
                </template>
              </v-text-field>
            </v-col>

          </v-row>
          <div class="d-flex align-center justify-center">
            <v-switch class="mr-2" v-model="dform.businessRegistration" @change="businessRegistrationStatus"
              label="Business Registration"></v-switch>
            <v-switch v-model="dform.founderRegistration" @change="founderRegistrationStatus"
              label="Founder Registration"></v-switch>
          </div>

        </v-form>
        <p class="text-end mt-1 mt-md-8 pb-3">
          <v-btn :loading="loading" @click="updateBusiness" class="mr-3 white--text" color="blue">
            save changes </v-btn>
        </p>
      </v-card>
    </v-dialog>
    <!-- end of dialog to edit individual business -->

    <!-- Start of founder dialog -->
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
import { UpdateADoc, onSnapshot, alluser } from '@/Auth/index';
import { snackMixin, rulesMixin } from "@/mixins";
import { bus } from "@/main.js";
import { mapState } from "vuex";
export default {
  name: "AllBusiness",
  props: ['currAdmin', 'allBusiness', 'allFounders'],
  mixins: [snackMixin, rulesMixin],
  data: () => ({
    business: [],
    selectedBusiness: {},
    sectorDialog: false,
    sectorSelected: '',
    showfoundersDialog: false,
    title: 'All Business',
    businessInfoDialog: false,
    editBusinessDialog: false,
    loading: false,
    dform: {},
    search: false,
    searchWord: '',
    items: [
      { title: "Business" },
      { title: "Founders" },
    ],
    businessData: [
        { label: "Business Name", field:"businessName"}, 
        { label: "Business Email", field:"businessEmail"}, 
        { label: "Sector", field:"businessSector"}, 
        { label: "Business Phone Number", field:"businessPhone"}, 
      ]
  }),
  created() {
    this.getAllBusiness();
  },
  methods: {
    getAllBusiness() {
      this.title = 'All Business'
      onSnapshot(alluser("business"), (snapshot) => {
        this.business = []
        snapshot.forEach((doc) => {
          this.business.push({ ...doc.data(), id: doc.id });
        });
      })
    },

    registeredBusiness() {
      this.title = 'All Registered Business'
      this.business = []
      let regBusiness = this.allBusiness.filter((e) => {
        return e.businessRegistration == true
      })
      this.business = regBusiness;
    },

    unRegisteredBusiness() {
      this.title = 'All Unregistered Business'
      this.business = []
      let unregBusiness = this.allBusiness.filter((e) => {
        return e.businessRegistration == false
      })
      this.business = unregBusiness;
    },

    selectSector() {
      this.title = `All Business under ${this.sectorSelected} sector`
      this.business = []
      this.sectorDialog = false
      let businessBySector = this.allBusiness.filter((e) => {
        return e.businessSector == this.sectorSelected
      })
      this.business = businessBySector

    },
    getSingleBusiness(id) {
      this.selectedBusiness = this.business.find((e) => { return e.id == id })
      this.businessInfoDialog = true
    },

    editBusiness(id) {
      this.dform = this.business.find((e) => { return e.id == id })
      this.editBusinessDialog = true
    },
    businessFounders(businessId) {
      let founders = this.allFounders.filter((e) => {
        return e.businessId == businessId
      })

      return founders

    },

    async updateBusiness() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true

          await UpdateADoc.update("business", this.dform.id, this.dform)
          // await UpdateADoc.update("business", this.activeUser, {businessRegistration: true})
          bus.$emit("snackbar", { msg: "Business Updated Succesfully", color: "success" });
          this.loading = false
        } catch (err) {
          this.loading = false
          bus.$emit("snackbar", { msg: "Error Ecoured", color: "error" });
        }
      }
    },
    async businessRegistrationStatus() {
      try {
        this.loading = true
        await UpdateADoc.update("business", this.dform.id, { businessRegistration: this.dform.businessRegistration })
        bus.$emit("snackbar", { msg: "Updated Succesfully", color: "success" });
        this.loading = false
      } catch (err) {
        this.loading = false
        bus.$emit("snackbar", { msg: "Error Ecoured", color: "error" });
      }
    },
    async founderRegistrationStatus() {
      try {
        this.loading = true
        await UpdateADoc.update("business", this.dform.id, { founderRegistration: this.dform.founderRegistration })
        bus.$emit("snackbar", { msg: "Updated Succesfully", color: "success" });
        this.loading = false
      } catch (err) {
        this.loading = false
        bus.$emit("snackbar", { msg: "Error Ecoured", color: "error" });
      }
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

    registrationBadge(business, founders) {
      let businessReg = business
      let individualReg = founders
      if (businessReg && individualReg) {
        return { badge: "badge-success", status: "Completed" }
      }
      return { badge: "badge-warning", status: "Pending" }
    },

    searchBusiness() {
      this.business = this.filteredBusiness
    }
  },
  computed: {
    ...mapState(["lgas", "sectors", "annualRevenue", "averageRevenue", "employees", "qualifications"]),

    numberOfBusiness() {
      return this.business.length
    },
    numberOfBusinessRegistered() {
      return this.allBusiness.length
    },
    numberOfFounders() {
      return this.allFounders.length
    },
    numberOfUnregisteredBusiness() {
      let unregBusiness = this.allCompany.filter((e) => {
        return e.businessRegistration == false
      })
      return unregBusiness.length
    },

    businessSectors() {
      let sector = this.allBusiness.filter((e) => {
        return e.businessSectors
      })
      return sector
    },
    nowDate() {
      let date = new Date();
      return date.toISOString().substring(0, 10);

    },
    showCourseStudied() {
      return this.dform.qualification != '' && this.dform.qualification != "None" && this.dform.qualification != "SSCE" && this.dform.qualification != "Others"
    },
    founderDate() {
      let now = new Date()
      let maxDate = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate())
      return maxDate.toISOString().substring(0, 10);
    },
    filteredBusiness() {
      return this.allBusiness.filter((business) => {
        let businessName = business.businessName.toLowerCase();
        return businessName.match(this.searchWord.toLowerCase())
      })
    },
  },


}
</script>

<style scoped>
.title-wrap {
  width: 60%;
  margin: 1em auto;
}

.form_card {
  /* border: 1px solid green; */
  width: 100%;
  padding: 5px 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 5px;
  border-bottom: 1px solid black;
}

.line h4 {
  font-size: 14px !important;
}



.founderImg {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 auto;
}

.founderImg img {
  width: 100%;
  height: 100%;
}

.logo {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid green !important;
  /* background: red; */
}

.logo img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
}


.basic h2 {
  text-align: center;
  color: green;
  font-size: 28px !important;
}

.about {


  padding: 1rem 2rem;
  margin: 1em 0;
  border-radius: 7px;
  transition: 0.8s;
  cursor: pointer;

}

.about:hover {
  transform: scale(1.05);
}

.contact {
  display: flex;
  justify-content: space-around;
  /* align-items: center; */

  padding: 7px 1rem;
  border-radius: 7px;
}


.names {
  display: flex;
  gap: 6px;
  align-items: center;
}

.names .name {
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-direction: column;
  width: 70%;
}

.btn-wrap {
  text-align: center;
}

input {
  border: none;
  outline: none;
  background: rgba(128, 128, 128, 0.639);
  padding: 4px;
  border-radius: 3px;
}

.search {
  background: white;
  padding: 5px 8px;
  outline: none;
  width: 50%;
}



@media (max-width:900px) {

  .contact {
    display: flex;
    flex-direction: column !important;
    /* align-items: center; */
  }

  .names {
    display: flex;
    gap: 6px;
    align-items: center;
    flex-direction: column;
  }

  .name {
    width: 100%;
  }

  .overview {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .center {
    text-align: center;
  }

  .sort {
    flex-direction: column;
    gap: 10px;
    margin: 0 !important;
  }



}
</style>