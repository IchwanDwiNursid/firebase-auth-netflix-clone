import { Container } from "@mui/material";
import { useUser } from "../../context/user.js";
import AuthLayout from "../../components/Layout/Authenticated.js";
import withProtected from "../../hoc/withProtected.js";

const Dashboard = () => {
  const { email, uid } = useUser();
  return (
    <AuthLayout title="Dashboard">
      <div>
        <p>
          Email : <b>{email}</b>
        </p>{" "}
        <br></br>
        <p>
          Uid : <b>{uid}</b>
        </p>
      </div>
    </AuthLayout>
  );
};

export default withProtected(Dashboard);
