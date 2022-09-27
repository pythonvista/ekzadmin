export const snackMixin = {
  data() {
    return {
      snackbar: false,
      snackMsg: "",
      snackColor: "",
      loading: false,
    };
  },

  methods: {
    displayMsg(msg, color = "success", state = true) {
      this.snackMsg = msg;
      this.snackColor = color;
      this.snackbar = state;
      this.loading ? (this.loading = false) : "";
    },
  },
};

export const editUserMixin = {
  computed: {
    editUser() {
      return this.$route.params.editUser;
    },
  },

  created() {
    this.editUser && (this.dform = this.editUser);
  },
};

export const editrouteTitleMixin = {
  created() {
    this.applyForm(this.$route.params.routeTitle);
    this.application_no = this.dform.application_no;
  },
};

export const rulesMixin = {
  data() {
    return {
      nameRules: [(v) => !!v || "Name is required"],
      passwdRules: [(v) => !!v || "Password is required"],
      phoneRules: [
        (v) => (v && v.length <= 15) || "Number must be less 16 8 digit ",
      ],
      messageRules: [(v) => !!v || "required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
};
