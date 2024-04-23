import { allWantedMountsThunk } from "../../redux/wanted";
import { allOwnedMountsThunk } from "../../redux/owned";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import MountListing from "./MountListing";
import './MyProfile.css'

export default function MyProfile() {
  const dispatch = useDispatch();
  const myWanted = useSelector(state => Object.values(state.wanted));
  const myOwned = useSelector(state => Object.values(state.owned));

  useEffect(() => {
    const getMyOwnedAndWanted = async () => {
      await dispatch(allOwnedMountsThunk());
      await dispatch(allWantedMountsThunk());
    }

    getMyOwnedAndWanted();
  }, [dispatch]);

  return (
    <div className="profile-container">
      <div className="owned-mounts-container">
        <h1 className="owned-mounts-header">My Mounts</h1>
        <div className="owned-mounts-list-container">
          {
            myOwned && myOwned.length > 0 ? (
              <p className="owned-mounts-description">Here are your {myOwned.length} mounts!</p>
            ) : (
              <p className="owned-mounts-description">You haven&apos;t <a href='https://mountr.onrender.com/api/mounts/owned'>imported your mounts</a> yet!</p>
            )
          }
          {
            myOwned && (
              myOwned.map(mount => (
                <MountListing mount={mount} key={mount.id} />
              ))
            )
          }
        </div>
      </div>
      <div className="wanted-mounts-container">
        <h1 className="wanted-mounts-header">My Wanted Mounts</h1>
        <div className="wanted-mounts-list-container">
          {
            myWanted && myWanted.length > 0 ? (
              <p className="wanted-mounts-description">Click on a mount to be redirected to its Wowhead page for more info!</p>
            ) : (
              <p className="wanted-mounts-description">You don&apos;t have any wanted mounts yet!</p>
            )
          }
          <div className="wanted-mounts-list">
            {
              myWanted && (
                myWanted.map(mount => (
                  <MountListing mount={mount} key={mount.id} />
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
