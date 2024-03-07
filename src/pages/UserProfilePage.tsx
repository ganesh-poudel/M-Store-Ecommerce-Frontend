import { stat } from "fs";
import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { Box, Button, CardContent, Modal, Stack, TextField, Typography } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useLazyGetSingleUserQuery, useUpdateUserMutation } from "../redux/users/userApi";
import { UserType, UserUpdate } from "../redux/users/user";
import { setUser } from "../redux/auth/authSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserProfilePage = () => {
  const [editUser, setEditUser] = useState<UserUpdate>({ name: "", email: "" });
  const currentUserData = useSelector((state: AppState) => state.authReducer.user);
  const [updateUser, { data }] = useUpdateUserMutation();
  // const user: UserType | undefined = data;
  const [getUpdatedUser, { data: user }] = useLazyGetSingleUserQuery();
  const dispatch = useDispatch();
  console.log("id", currentUserData?.id);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(editUser);
  const updateHandler = async () => {
    if (currentUserData !== null) {
      await updateUser({ id: currentUserData.id, rest: editUser });
      // dispatch(setUser(data));
      getUpdatedUser(currentUserData.id)
        .unwrap()
        .then((data) => {
          dispatch(setUser(data));
        });
      console.log("update user", data);
    }
  };

  return (
    <Box>
      <CardContent>
        <Typography color="text.secondary" gutterBottom variant="h5">
          Name: {currentUserData?.name}
        </Typography>
        <Typography variant="h6" component="div">
          Email : {currentUserData?.email}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Role : {currentUserData?.role}
        </Typography>
        <Box display="flex" gap={2} justifyContent="center">
          <Button onClick={handleOpen}>Edit Profile</Button>
          <BorderColorIcon />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Stack sx={style} gap={3}>
              <TextField
                fullWidth
                label="Name"
                id="Name"
                name="name"
                placeholder={currentUserData?.name}
                type="text"
                onChange={handleEditChange}
              />
              <TextField
                fullWidth
                label="Email"
                id="Email"
                value={editUser.email}
                name="email"
                placeholder={currentUserData?.email}
                onChange={handleEditChange}
              />
              <Button onClick={updateHandler}>Update</Button>
            </Stack>
          </Modal>
        </Box>
      </CardContent>
    </Box>
  );
};

export default UserProfilePage;
