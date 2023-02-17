import React from "react";

import { updateProfile } from "../../../actions/users";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";

function ProfileBio({ currentProfile }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [locData, setlocData] = useState();
  const loc = async () => {
    let response = await axios.get(
      "https://ipinfo.io/json?token=8ba3f84c7d6dcc"
    );
    const data = await response;
    let tmp = {
      country: data?.data.country,
      state: data?.data.region,
      city: data?.data.city,
    };
    setlocData(tmp);
  };

  const handleLocClick = () => {
    loc();
    console.log(locData);

    dispatch(
      updateProfile(currentUser?.result?._id, {
        location: locData,
      })
    );
  };
  return (
    <div>
      <div>
        {currentProfile?.tags.length !== 0 ? (
          <>
            <h4>Tags Watched</h4>
            {currentProfile?.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </>
        ) : (
          <p>0 Tags Watched</p>
        )}
      </div>
      <div>
        {currentProfile?.about ? (
          <>
            <h4>About</h4>
            {currentProfile?.about}
          </>
        ) : (
          <p>No Bio Found</p>
        )}
      </div>
      <div>
        <h4>Location</h4>
        {currentProfile?.location?.country ? (
          <>
            <p>Country : {currentProfile?.location?.country}</p>
            <p>State : {currentProfile?.location?.state}</p>
            <p>City : {currentProfile?.location?.city}</p>
          </>
        ) : (
          <p>User has not provided location!!!</p>
        )}
        <div>
          <button className="location-btn" onClick={handleLocClick()}>
            Get Location
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileBio;
