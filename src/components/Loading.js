import { Grid, Loading } from "@nextui-org/react";

export default () => (
  <div className="flex flex-col items-center justify-center w-full h-screen">
    <Grid
      css={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Loading color="warning" textColor="warning">
        Warning
      </Loading>
    </Grid>
  </div>
);
