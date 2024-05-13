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
  let pageSize = 20;
  let pageNum = 1;
  let countStart = pageSize * (pageNum - 1) + 1;
  let totalMountCount = myOwned && myOwned.pop();
  let maxPages = myOwned && Math.ceil(totalMountCount / pageSize);
  let pageList = maxPages && range(maxPages);

  useEffect(() => {
    const getMyOwnedAndWanted = async () => {
      await dispatch(allOwnedMountsThunk(pageNum));
      await dispatch(allWantedMountsThunk());
    }

    getMyOwnedAndWanted();
  }, [dispatch, pageNum]);

  function range(size, startAt = 1) {
    return [...Array(size).keys()].map(i => i + startAt);
  }

  async function goToPage(page) {
    pageNum = parseInt(page.target.getAttribute("value"));
    countStart = pageSize * (pageNum - 1) + 1;
    await dispatch(allOwnedMountsThunk(pageNum));
  }


  return (
    <div className="profile-container">
      <div className="owned-mounts-container">
        <h1 className="owned-mounts-header">My Mounts</h1>
        <div className="owned-mounts-list-container">
          {
            myOwned && myOwned.length > 0 ? (
              <>
                <p className="owned-mounts-description">Here are your {totalMountCount} mounts!</p>
                <p className="owned-mounts-reimport-link">Got some new mounts? <a href='https://mountr.onrender.com/api/mounts/owned'>Re-import now</a>!</p>
              </>
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
          <div className="pagination-container">
            {
              myOwned && myOwned.length > 0 && pageList && pageList.length && (
                <>
                  <p className="pagination-page">Page</p>
                  {
                  pageList.map(page => (
                    <span className="pagination-number" onClick={e => {goToPage(e)}} key={page} value={page}>{page} </span>
                  ))
                  }
                </>
              )
            }
          </div>
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
