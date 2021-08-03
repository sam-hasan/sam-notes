const books = [
  {
    _id: '1',
    name: 'The Invisbile Life of Addie LaRue',
    author: 'V.E Schwab',
    image: '/images/the-invisible-life-of-addie-larue.jpeg',
    preview:
      'This is a book about a girl, a boy, a devil, and the stories that get told and repeated and remembered. This is a tale of power dynamics and imbalances and what humans are willing to do to not feel trapped and alone.',
    topSentences:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    impressions:
      'Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.',
    recommendedFor:
      'Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti.',
    influence:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio',
    topQuotes: [
      'Et harum quidem rerum facilis est et expedita distinctio',
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus',
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet',
    ],
    genre: 'Fantasy',
    numReviews: 6,
  },
  {
    _id: '2',
    name: 'Mindset',
    author: 'Carol S. Dweck',
    image: '/images/mindset.jpeg',
    preview:
      'The premise of the book is the basis of cognitive psychology: what you believe affects your whole life, so if you can change your beliefs, ie, your mindset, you can change your life. This book characterizes two mindsets, the fixed and the growth-oriented.',
    topSentences:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    impressions:
      'Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.',
    recommendedFor:
      'Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti.',
    influence:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio',
    topQuotes: [
      'Et harum quidem rerum facilis est et expedita distinctio',
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus',
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet',
    ],
    genre: 'Psychology',
    numReviews: 3,
  },
  {
    _id: '3',
    name: 'To Kill A Mockingbird',
    author: 'Harper Lee',
    image: '/images/to-kill-a-mockingbird.jpeg',
    preview:
      'A wonderful piece of literature, great characters, plot and prose. There is sadness and happiness, racism and equality, immaturity and maturity, injustice and redemption. Atticus is a man we could all love and look up to a grounded just and fair man he sees beyond race and finds the goodness in people.',
    topSentences:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    impressions:
      'Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.',
    recommendedFor:
      'Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti.',
    influence:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio',
    topQuotes: [
      'Et harum quidem rerum facilis est et expedita distinctio',
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus',
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet',
    ],
    genre: 'Classics',
    numReviews: 5,
  },
  {
    _id: '4',
    name: 'The Fault In Our Stars',
    author: 'John Green',
    image: '/images/the-fault-in-our-stars.jpeg',
    preview:
      'This was a story of love, and loss, of grief, and hope, and all the infinities in between. Words are incapable of expressing how tender and open my heart felt after reading this. It taught me how to find the positive in the most hopeless of situations.',
    topSentences:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    impressions:
      'Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.',
    recommendedFor:
      'Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti.',
    influence:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio',
    topQuotes: [
      'Et harum quidem rerum facilis est et expedita distinctio',
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus',
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet',
    ],
    genre: 'Young Adult',
    numReviews: 2,
  },
  {
    _id: '5',
    name: "Monday's Not Coming",
    author: 'Tiffany Jackson',
    image: '/images/mondays-not-coming.jpeg',
    preview:
      "Monday's Not Coming is an amazing read! A lot of things went down in it and most of it was unexpected for my ears! In this book, you will meet Monday and Claudia. Their friendship was probably the sweetest thing ever but what happened to them was the saddest.",
    topSentences:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    impressions:
      'Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.',
    recommendedFor:
      'Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti.',
    influence:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio',
    topQuotes: [
      'Et harum quidem rerum facilis est et expedita distinctio',
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus',
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet',
    ],
    genre: 'Young Adult',
    numReviews: 3,
  },
  {
    _id: '6',
    name: 'Becoming',
    author: 'Michelle Obama',
    image: '/images/becoming.jpeg',
    preview:
      'Becoming by Michelle Obama is a captivating and compelling read, narrated by Michelle Obama herself makes this a moving, deeply personal and intimate story which is both inspirational and insightful. I didn’t think I could admire and respect the former First Lady any more than I already did',
    topSentences:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    impressions:
      'Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet.',
    recommendedFor:
      'Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti.',
    influence:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio',
    topQuotes: [
      'Et harum quidem rerum facilis est et expedita distinctio',
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus',
      'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet',
    ],
    genre: 'Memoir',
    numReviews: 4,
  },
];

export default books;
