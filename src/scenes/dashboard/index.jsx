import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const cardStyle = {
    backgroundColor: colors.primary[400],
    borderRadius: "12px",
  };

  return (
    <Box m={{ xs: "10px", sm: "20px" }}>
      {/* HEADER */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap="10px"
      >
        <Header title="DASHBOARD" subtitle="PENDATAAN SENTRA EKONOMI" />
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            px: 3,
            py: 1.5,
            borderRadius: "12px",
            mb: 2,
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: 1 }} />
          Download Reports
        </Button>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "repeat(12, 1fr)" }}
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {["Emails Sent", "Sales Obtained", "New Clients", "Traffic Received"].map(
          (label, i) => (
            <Box
              key={i}
              gridColumn={{ xs: "span 12", sm: "span 3" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={cardStyle}
            >
              <StatBox
                title={["12,361", "431,225", "32,441", "1,325,134"][i]}
                subtitle={label}
                progress={["0.75", "0.50", "0.30", "0.80"][i]}
                increase={["+14%", "+21%", "+5%", "+43%"][i]}
                icon={
                  [
                    <EmailIcon />,
                    <PointOfSaleIcon />,
                    <PersonAddIcon />,
                    <TrafficIcon />,
                  ][i]
                }
              />
            </Box>
          )
        )}

        {/* ROW 2 - Line Chart */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 8" }}
          gridRow="span 2"
          sx={cardStyle}
        >
          <Box
            mt="25px"
            px="30px"
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Box>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: 26, color: colors.greenAccent[500] }}
              />
            </IconButton>
          </Box>
          <Box height="250px" mt="-20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 2 - Transactions */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 4" }}
          gridRow="span 2"
          sx={{ ...cardStyle, overflow: "auto" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((tx, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {tx.txId}
                </Typography>
                <Typography color={colors.grey[100]}>{tx.user}</Typography>
              </Box>
              <Typography color={colors.grey[100]}>{tx.date}</Typography>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${tx.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 - Campaign */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 4" }}
          gridRow="span 2"
          p="30px"
          sx={cardStyle}
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size={isMobile ? 100 : 125} />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              mt="15px"
            >
              $48,352 revenue generated
            </Typography>
            <Typography textAlign="center">
              Includes extra misc expenditures and costs
            </Typography>
          </Box>
        </Box>

        {/* ROW 3 - Sales Quantity */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 4" }}
          gridRow="span 2"
          p="30px"
          sx={cardStyle}
        >
          <Typography variant="h5" fontWeight="600" mb="15px">
            Sales Quantity
          </Typography>
          <Box height="250px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 3 - Geography Chart */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 4" }}
          gridRow="span 2"
          p="30px"
          sx={cardStyle}
        >
          <Typography variant="h5" fontWeight="600" mb="15px">
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
