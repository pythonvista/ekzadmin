<template>
  <div class="main-panel ">
    <div class="content-wrapper">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "AllBusiness",
   props: ['currAdmin', 'allCompany', 'allBusiness', 'allFounders'],
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

<style>
</style>