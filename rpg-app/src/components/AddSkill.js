import React from "react";

export default function AddSkill() {
  return (
    <>
      <form action="">
        <input type="text" placeholder="New Skill" />
        <input type="text" placeholder="Skill Description" />
        <span>
          Level
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </span>
      </form>
    </>
  );
}
