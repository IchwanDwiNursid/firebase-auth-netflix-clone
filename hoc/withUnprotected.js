import { useRouter } from "next/router";
import { useUser } from "../context/user.js";

const withUnprotected = (Pages) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const user = useUser();
    const { uid } = user;
    const router = useRouter();

    if (uid) {
      router.replace("/dashboard");
      return <></>;
    }

    return <Pages {...props} />;
  };
};

export default withUnprotected;
