import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../redux/products/product.api";
import { ProductType } from "../../redux/products/product";
import { Pagination } from "@mui/material";
import { usePagination } from "../../hooks/UsePagination";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../redux/users/userApi";
import { UserType } from "../../redux/users/user";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const UserList = () => {
  let [page, setPage] = useState(1);
  const { data: products } = useGetAllUsersQuery();
  const [deleteItem] = useDeleteUserMutation();
  const PER_PAGE = 10;
  const totalPages = Math.ceil(products?.length ?? 0 / PER_PAGE);
  const _DATA = usePagination({ data: products ?? [], itemsPerPage: PER_PAGE });

  const handleChange = (event: React.ChangeEvent<unknown>, pageCurrent: number) => {
    setPage(pageCurrent);
    _DATA.jump(pageCurrent);
  };

  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mb: 2 }} variant="h5" component="div">
        User List
      </Typography>
      <Demo>
        <List>
          {_DATA.currentData().map((item) => {
            return (
              <ListItem sx={{ display: "flex", justifyContent: "space-evenly" }}>
                <ListItemAvatar>
                  <Avatar sx={{ width: 30, height: 30 }} src={item?.avatar} />
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <Box gap="20px" display="flex">
                  <IconButton edge="end" aria-label="delete" onClick={(e) => deleteItem(item.id)}>
                    <DriveFileRenameOutlineIcon sx={{ color: "#1b5e20", justifyItems: "center" }} />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon sx={{ color: "#d50000" }} onClick={(e) => deleteItem(item.id)} />
                  </IconButton>
                </Box>
              </ListItem>
            );
          })}
        </List>

        <Pagination
          count={totalPages}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Demo>
    </Grid>
  );
};
