<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo d-flex justify-center">
                <img src="/images/logo.png" alt="logo">
              </div>
              <h6 class="font-weight-light">Sign in to continue.</h6>
              <v-form ref="form" class="pt-3">
                <div class="form-group">
                  <v-text-field :rules="emailRules" v-model="email" type="email" class="form-control form-control-lg"
                    id="exampleInputEmail1" placeholder="Email"></v-text-field>
                </div>
                <div class="form-group">
                  <v-text-field :rules="passwdRules" v-model="passwd" type="password"
                    class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password">
                  </v-text-field>
                </div>
                <div class="mt-3">
                  <v-btn @click="Login" :loading="loading"
                    class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</v-btn>
                </div>
                <div class="my-2 d-flex justify-content-between align-items-center">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input">
                      Keep me signed in
                    </label>
                  </div>
                  <a href="#" class="auth-link text-black">Forgot password?</a>
                </div>
              </v-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- page-body-wrapper ends -->
  </div>
</template>

<script>
import { createAccount, docUpate } from '@/Auth/index';
import { bus } from "@/main.js"
import { login, passwordReset, selectedUser, onSnapshot } from '@/Auth/index'
export default {
  name: "AdminLogin",
  data: () => ({
    email: "",
    passwd: "",
    loading: false,
    admin: {},
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwdRules: [(v) => !!v || "Password is required"]
  }),
  methods: {
    async signUp() {
      try {
        const res = await createAccount.start(this.email, this.passwd)
        if (res) {
          await docUpate.update('Admin', res.user.uid,
            {
              adminName: "ADMIN",
              adminEmail: this.email,
              isAdmin: true
            }
          )
          alert("succesfull")
        }
      } catch (e) {
        alert(e)
      }

    },

    async Login() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true
          const res = await login.start(this.email, this.passwd)
          if (res) {
            onSnapshot(selectedUser("Admin", res.user.uid), (doc) => {
              this.admin = doc.data()
              if (!this.admin) {
                this.loading = false
                bus.$emit("snackbar", { msg: "Permission Denied, You Are Not An Admin", color: "error" });
              }
              if (this.admin) {
                this.loading = false
                this.$store.dispatch('ActiveAdmin', res.user.uid)
                this.$store.dispatch('AdminState', this.admin.isAdmin)
                bus.$emit("snackbar", { msg: "Logged In Succesful", color: "success" });
                this.$router.push({ path: "/dashboard" })
              }
            })
          }
        } catch (err) {
          this.loading = false
          if (err.message == "Firebase: Error (auth/invalid-email).") {
            bus.$emit("snackbar", { msg: "Invalid Email Or Password", color: "error" });
          } else if (err.message == "Firebase: Error (auth/user-not-found).") {
            bus.$emit("snackbar", { msg: "Email Not found", color: "error" });

          } else if (err.message == "Firebase: Error (auth/missing-email).") {
            bus.$emit("snackbar", { msg: "Provide Email Or Password", color: "error" });
          }
          else if (err.message == "Firebase: Error (auth/wrong-password).") {
            bus.$emit("snackbar", { msg: "Incorrect Password. Try Again!", color: "error" });
          } else if (err.message == "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).") {
            bus.$emit("snackbar", { msg: "Account Disabled. To Many Attempted Failed Login. Reset Your Password", color: "error" });
          } else {
            bus.$emit("snackbar", { msg: "Error Ecountered", color: "error" });
          }
        }
      }

    },
    async resetPassword() {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          await passwordReset.reset(this.resetEmail)
          this.loading = false
          bus.$emit("snackbar", { msg: "Password Reset Mail Sent", color: "Success" });
          this.dialog = false
        } catch (err) {
          this.loading = false
          if (err.message == "Firebase: Error (auth/missing-email)") {
            bus.$emit("snackbar", { msg: "Email not Valid", color: "error" });
          }

          if (err.message == "Firebase: Error (auth/user-not-found).") {
            bus.$emit("snackbar", { msg: "Email or User not found", color: "error" });
          }
        }
      }


    }
  }


}
</script>

<style scoped>
.v-text-field,
.v-text-field .v-input__control {
  padding: 5 8px !important;
  margin: 0 !important;
  width: 100% !important;
  height: 100% !important;
  outline: none !important;
  border: none !important;
  display: inline !important;
}

.form-group {
  margin: 0 !important;
  padding: 0 !important;
}

.form-control {
  padding: 3em 0 !important;
}
</style>