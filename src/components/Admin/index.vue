<template>
  <div class="main-panel ">
    <div class="content-wrapper">
      <!-- end of dashboard info -->
      <div class="row">
        <div class="col-md-12 grid-margin">
          <div class="row">
            <div class="col-12 col-xl-8 mb-4 mb-xl-0">
              <h3 class="font-weight-bold">Welcome {{ currAdmin.adminName }}</h3>
              <h5>{{ currAdmin.adminEmail }}</h5>
            </div>

          </div>
        </div>
      </div>
      <!-- end of dashboard info -->

      <!-- beginning of dashboard stats -->
      <div class="row">
        <div class="col-md-6 grid-margin stretch-card">
          <div class="card tale-bg">
            <div class="card-people mt-auto">
              <img src="images/dashboard/people.svg" alt="people">
              <div class="weather-info">
                <div class="d-flex">
                  <div>
                    <h2>Ekiti</h2>

                  </div>
                  <div class="ml-2">
                    <h4 class="location font-weight-normal">Knowledge</h4>
                    <h6 class="font-weight-normal">Zone (EKZ)</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 grid-margin transparent">
          <div class="row">
            <div class="col-md-6 mb-4 stretch-card transparent">
              <div class="card card-tale">
                <div class="card-body">
                  <p class="mb-4">Total Numbers Of Company</p>
                  <p class="fs-30 ">{{ numberOfCompany }}</p>
                  <!-- <p>10.00% (30 days)</p> -->
                </div>
              </div>
            </div>
            <div class="col-md-6 mb-4 stretch-card transparent">
              <div class="card card-dark-blue">
                <div class="card-body">
                  <p class="mb-4">Total Business Registered</p>
                  <p class="fs-30 ">{{ numberOfBusinessRegistered }}</p>
                  <!-- <p>22.00% (30 days)</p> -->
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
              <div class="card card-light-blue">
                <div class="card-body">
                  <p class="mb-4">Total Number of Founders Registered</p>
                  <p class="fs-30 ">{{ numberOfFounders }}</p>
                  <!-- <p>2.00% (30 days)</p> -->
                </div>
              </div>
            </div>
            <div class="col-md-6 stretch-card transparent">
              <div class="card card-light-danger">
                <div class="card-body">
                  <p class="mb-4">Numbers of Unregistered Businesses</p>
                  <p class="fs-30 ">{{ numberOfUnregisteredBusiness }}</p>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end of dashboard stats -->


      <!-- company registration Status -->
      <div class="row">

        <div class="col-md-12 grid-margin stretch-card">

          <div class="card position-relative">
            <div class="card-body">
              <h5 class="d-flex align-center justify-center">Business Details</h5>
              <div id="detailedReports" class="carousel slide detailed-report-carousel position-static pt-2"
                data-ride="carousel">
                <div class="carousel-inner">

                  <div class="carousel-item" v-for="(company, index) in allCompany" :key="index"
                    :class="{ 'active': index == 1 }">

                    <div class="row">
                      <div class="col-md-12 col-xl-3 d-flex flex-column justify-content-start">
                        <h5 class="d-flex align-center justify-center">{{ company.companyName }}</h5>
                        <div class="ml-xl-4 mt-3">
                          <v-avatar>
                            <v-img :src="company.companyLogo" alt="">
                              <template #placeholder>
                                <v-icon large>
                                  mdi-account
                                </v-icon>
                              </template>
                            </v-img>
                          </v-avatar>
                          <h5 class="text-primary">{{ company.businessId }}</h5>
                          <h5 class="">{{ company.companyEmail }}</h5>
                          <h4 class="font-weight-500 mb-xl-4 text-primary">Business Overview</h4>
                          <p v-if="getAocBusiness(company.id).businessOverview" style="" class="mb-2 mb-xl-0">{{
                              getAocBusiness(company.id).businessOverview
                          }}</p>
                          <p v-else style="" class="mb-2 mb-xl-0">{{ getAocBusiness(company.id) }}</p>
                        </div>
                      </div>
                      <div class="col-md-12 col-xl-9">
                        <div class="row">
                          <div class="col-md-12 border-right">
                            <div class="table-responsive mb-3 mb-md-0 mt-3">
                              <table class="table table-borderless report-table">
                                <tr>
                                  <td class="text-muted">Registration Completion</td>
                                  <td class="w-100 px-0">

                                    <div class="progress progress-md mx-4">
                                      <div class="progress-bar " color="blue" role="progressbar"
                                        :style="{ 'width': registrationCompletion(company.businessRegistration, company.founderRegistration).width }"
                                        aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                  </td>
                                  <td>
                                    <h5 class="font-weight-bold mb-0">
                                      {{ registrationCompletion(company.businessRegistration,
                                          company.founderRegistration).width
                                      }} </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="text-muted">Total Founders</td>
                                  <td class="w-100 px-0">
                                    <div class="progress progress-md mx-4">
                                      <div class="progress-bar bg-danger" role="progressbar"
                                        :style="{ 'width': companyFounders(company.businessId).width }"
                                        aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>

                                    </div>
                                  </td>
                                  <td>
                                    <h5 class="font-weight-bold mb-0">{{ companyFounders(company.businessId).length }}
                                    </h5>
                                  </td>
                                </tr>
                                <tr v-if="company.founderRegistration">
                                  <td class="text-muted">Founders</td>
                                  <td class="w-100 px-0">
                                    <div class="founders">
                                      <div class="each"
                                        v-for="(eachFounder, index) in  companyFounders(company.businessId).founders"
                                        :key="index">
                                        <v-avatar>
                                          <v-img :src="eachFounder.founderImage" alt="">
                                            <template #placeholder>
                                              <v-icon large>
                                                mdi-account
                                              </v-icon>
                                            </template>
                                          </v-img>
                                        </v-avatar>
                                        <p>{{ eachFounder.firstName }}</p>
                                      </div>

                                    </div>
                                  </td>
                                  <td>

                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a class="carousel-control-prev" href="#detailedReports" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#detailedReports" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end company registration Status -->

      <!-- the side of the copany data  -->
      <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <p class="card-title mb-0">All Company</p>
              <div class="table-responsive">
                <table class="table table-striped table-borderless">
                  <thead>
                    <tr>
                      <th>Business Name</th>
                      <th>Business Sector</th>
                      <th>Business Email</th>
                      <th>Registration Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(company, index) in allCompany" :key="index">
                      <td>{{ company.companyName }}</td>
                      <td class="font-weight-bold">{{ getAocBusiness(company.id).businessSector }}</td>
                      <td>{{ company.companyEmail }}</td>
                      <td class="font-weight-medium">
                        <div class="badge " :class="registrationBadge(company.businessRegistration, company.founderRegistration).badge">{{
                            registrationBadge(company.businessRegistration, company.founderRegistration).status
                        }}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end of the copany data  -->
    </div>
  </div>

</template>

<script>
export default {
  name: "MainView",
  props: ['currAdmin', 'allCompany', 'allBusiness', 'allFounders'],
  data: () => ({


  }),
  methods: {
    getAocBusiness(companyId) {
      let singleBusiness = this.allBusiness.find((business) => business.id == companyId)
      if (!singleBusiness) {
        return "Business Registration Not Found"
      }
      return singleBusiness
    },
    registrationCompletion(business, founders) {
      let businessReg = business
      let individualReg = founders
      if (businessReg && individualReg) {

        return { width: "100%", percentage: 100, color: "green" }
      }
      if (businessReg || individualReg) {

        return { width: "54%", percentage: 54, color: "blue" }
      }
      return { width: "12%", percentage: 12, color: "red" }
    },

    registrationBadge(business, founders) {
      let businessReg = business
      let individualReg = founders
      if (businessReg && individualReg) {
        return { badge: "badge-success", status: "Completed" }
      }
      return { badge: "badge-warning", status: "Pending" }
    },


    companyFounders(businessId) {
      let founders = this.allFounders.filter((e) => {
        return e.businessId == businessId
      })
      let widthPercentage = `${founders.length * 10}%`;
      return { founders: founders, length: founders.length, width: widthPercentage }

    }
  },
  computed: {
    numberOfCompany() {
      return this.allCompany.length
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
    }
  }
}
</script>

<style scoped>
.founders {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.each {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>