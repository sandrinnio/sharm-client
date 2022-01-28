import { PinData } from "../interfaces";

export const userQuery = (id: string) => `*[_type == "user" && _id == '${id}']`;

export const searchQuery = (searchTerm: string) =>
  `*[_type == "pin" && title match "${searchTerm}*" || category match "${searchTerm}*" || about match "${searchTerm}*"] {
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image {
    asset -> {
      url
    }
  },
  _id,
  destination,
  postedBy -> {
    _id,
    userName,
    image
  },
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`;

export const pinDetailQuery = (
  id: string
) => `*[_type == "pin" && _id == '${id}'] {
    image {
      asset -> {
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
   save[] {
      postedBy -> {
        _id,
        userName,
        image
      },
    },
    comments[] {
      comment,
      _key,
      postedBy ->{
        _id,
        userName,
        image
      },
    }
  }`;

export const pinDetailMorePinQuery = (
  pin: PinData
) => `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ] {
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;

export const userCreatedPinsQuery = (
  id: string
) => `*[ _type == 'pin' && userId == '${id}'] | order(_createdAt desc) {
      image {
        asset -> {
          url
        }
      },
      _id,
      destination,
      postedBy -> {
        _id,
        userName,
        image
      },
      save[] {
        postedBy -> {
          _id,
          userName,
          image
        },
      },
    }`;

export const userSavedPinsQuery = (
  id: string
) => `*[_type == 'pin' && '${id}' in save[].userId ] | order(_createdAt desc) {
      image {
        asset -> {
          url
        }
      },
      _id,
      destination,
      postedBy -> {
        _id,
        userName,
        image
      },
      save[] {
        postedBy -> {
          _id,
          userName,
          image
        },
      },
    }`;
