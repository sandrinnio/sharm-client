export { categories } from "./categories";
export {
  userQuery,
  searchQuery,
  feedQuery,
  pinDetailQuery,
  pinDetailMorePinQuery,
  userCreatedPinsQuery,
  userSavedPinsQuery,
} from "./queries";

export const fetchUser = () =>
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : localStorage.clear();
