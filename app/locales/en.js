const translate = {
  title: 'RopaOlle.se',
  langCode: {
    sv: 'SV',
    en: 'EN',
  },
  language: {
    sv: 'Swedish',
    en: 'English',
  },
  header: {
    home: 'Home',
    history: 'History',
    me: 'Account',
    users: 'Users',
    admin: 'Administration',
    signIn: 'Sign in',
    signOut: 'Sign out',
  },
  footer: {
    firstRow: '{{ropaolle}}, copyright © {{year}}.',
    ropaolle: {
      href: 'https://www.ropaolle.se',
      text: 'RopaOlle.se',
    },
  },
  // statusIcons: {
  //   unknown: { title: 'Unknown', color: '#ffc107', icon: 'QuestionCircleIcon', text: 'Unknown' },
  //   regSuccess: { title: 'OK', color: '#28a745', icon: 'CheckCircleIcon', text: 'Registration OK' },
  //   regError: {
  //     title: 'Error',
  //     color: '#dc3545',
  //     icon: 'ExclamationTriangleIcon',
  //     text: 'Registration error!',
  //   },
  //   probError: {
  //     title: 'Prob error',
  //     color: '#ffc107',
  //     icon: 'ExclamationTriangleIcon',
  //     text: 'Prob error!',
  //   },
  // },
  history: {
    more: 'more...',
    title: 'History',
    table: {
      createdAt: 'Time',
      level: 'Level',
      message: 'Message',
      jsonData: 'Data',
    },
    tableEmpty: 'No content...',
  },
  home: {
    regSuccess: 'Registrations',
    regError: 'Registration errors',
    probError: 'Prob errors',
    latest: 'latest',
    tellMeMore: 'Wow, tell me more',
    signIn: 'sign in',
  },
  me: {
    title: 'My account',
    form: {
      firstName: {
        title: 'First name',
      },
      lastName: {
        title: 'Last name',
      },
      email: {
        title: 'Email',
        placeholder: 'test@example.com',
      },
      mobile: {
        title: 'Cell number',
        placeholder: '+467012345678',
      },
      langCode: {
        title: 'Language',
        sv: 'Swedish',
        en: 'English',
      },
      button: {
        label: 'Save',
        loading: 'Saving...',
      },
    },
  },
  signin: {
    title: 'Sign in',
    wrongCredentials: 'Invalid username or password.',
    userIsBlocked: 'The account is blocked.',
    form: {
      email: {
        title: 'Email',
        placeholder: 'test@example.com',
      },
      password: {
        title: 'Password',
        placeholder: 'secret',
      },
      rememberMe: {
        title: 'Remember me',
      },
      button: {
        label: 'Sign in',
        loading: 'Signing in...',
      },
    },
    forgotPassword: {
      text: 'I have {{link}}.',
      link: {
        href: 'forgot-password',
        text: 'forgot my password',
      },
    },
  },
  signOut: {
    spinner: 'Signing out...',
  },
  signup: {
    title: 'Create account',
    emailSent:
      'A new account have been created and instruction of how to validate your Email have been sent.',
    emailExists: 'Email is already used.',
    form: {
      firstName: {
        title: 'First name',
        required: 'Required',
        error: 'Must be 15 characters or less',
      },
      lastName: {
        title: 'Last name',
      },
      email: {
        title: 'Email',
        required: 'Required',
        error: 'Email is required',
      },
      password: {
        title: 'Password',
        required: 'Required',
        error: 'The password have to be at least 8 characters',
      },
      button: {
        label: 'Create account',
        loading: 'Creating account...',
      },
    },
  },
  forgotPassword: {
    title: 'Recover password',
    emailSent: 'An Email with further instructions have been sent.',
    emailError: 'Email could not be sent!',
    form: {
      email: {
        title: 'Email',
        required: 'Required',
        error: 'Email is requiered',
      },
      button: {
        label: 'Recover password',
        loading: 'Recovering password...',
      },
    },
  },
  resetPassword: {
    title: 'Update password',
    emailExists: 'Email is alredy used.',
    invalidToken: 'Invalid token.',
    form: {
      password: {
        title: 'Password',
        required: 'Required',
        error: 'The password have to be at least 8 characters',
      },
      confirmPassword: {
        title: 'Validate password',
        required: 'Required',
        error: 'The passwords are not equal.',
      },
      button: {
        label: 'Save',
        loading: 'Saving...',
      },
    },
  },
  users: {
    title: 'Users',
    table: {
      firstName: 'Name',
      email: 'Email',
      isAdmin: 'Administrator',
      lastAccess: 'Last access',
    },
    tableEmpty: 'No content...',
  },
  error: {
    title: 'Error',
    types: {
      expiredToken: 'Your token have expired.',
      missingToken: 'Token missing',
      invalidToken: 'Invalid token',
      databaseError: 'Database error',
    },
  },
  pager: {
    totalCount: 'Total:',
    rowsPerPage: 'Rows per page',
  },
  buttons: {
    save: {
      label: 'Save',
      loading: 'Saving...',
    },
  },
  spinner: { loading: 'Loading...' },
};

export default translate;
