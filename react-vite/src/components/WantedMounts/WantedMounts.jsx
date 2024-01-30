import { allWantedMountsThunk } from "../../redux/mount";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import MountListing from "./MountListing";
import './WantedMounts.css'

export default function WantedMounts() {
  const dispatch = useDispatch();
  const myWanted = useSelector(state => Object.values(state.mounts));

  useEffect(() => {
    const getMyWanted = async () => {
      await dispatch(allWantedMountsThunk());
    }

    getMyWanted();
  }, [dispatch]);

  console.log(myWanted)

  return (
    <div className="wanted-mounts-container">
      <h1 className="wanted-mounts-header">My Wanted Mounts</h1>
      <div className="wanted-mounts-list-container">
        <p className="wanted-mounts-description">Click on a mount to be redirected to its Wowhead page for more info!</p>
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
  )
}
