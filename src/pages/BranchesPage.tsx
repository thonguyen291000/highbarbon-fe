import { Box } from "@mui/material";
import NormalCard from "../components/Card/NormalCard";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { Spinner } from "../components";

export const BranchesPage = () => {
  const navigate = useNavigate();
  const { appData } = useAppData();

  const handleClick = (branchId) => {
    navigate(`${branchId}`);
  };

  if (!appData) return <Spinner />;

  return (
    <Box>
      {appData.branches.map((branch) => (
        <NormalCard
          title={branch.name}
          description={branch.description}
          bottomRightContent={`${branch.restaurants.length} Quán`}
          image={branch.image}
          handleClick={() => handleClick(branch._id)}
        />
      ))}
    </Box>
  );
};
