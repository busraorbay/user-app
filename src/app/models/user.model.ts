export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    suite: string;
    geo: {
      lat: string;
      lng: string;
    };
  };

  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
