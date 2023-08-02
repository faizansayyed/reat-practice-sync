// CustomCellRenderer.js
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const CustomCellRenderer = ({ value, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleDelete = () => {
    onDelete(value);
    setOpen(false);
  };

  const handleEdit = () => {
    onEdit(value);
    setOpen(false);
  };

  return (
    <div>
      <div
        onClick={handleToggle}
        ref={anchorRef}
        style={{ cursor: 'pointer' }}
      >
        &#8942;
      </div>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        disablePortal={true}
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Paper>
              <List>
                <ListItem button onClick={handleDelete}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Delete" />
                </ListItem>
                <ListItem button onClick={handleEdit}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit" />
                </ListItem>
              </List>
            </Paper>
          </ClickAwayListener>
        )}
      </Popper>
    </div>
  );
};

export default CustomCellRenderer;
