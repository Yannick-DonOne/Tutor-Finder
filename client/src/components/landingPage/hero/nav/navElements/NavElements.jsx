import React, { createRef, useState } from "react";

const Nav = createRef();
const elements = createRef();

const navitems = [
  { id: 0, name: "Explore", class: "navItemFocus", id: "exploreTutors" },
  { id: 1, name: "Why", class: "navItem", id: "whyAthena" },
  { id: 2, name: "New posts", class: "navItem", id: "newPost" },
  { id: 3, name: "About", class: "navItem", id: "about" },
  { id: 4, name: "Contacts", class: "navItem", id: "contacts" },
];

export default function NavElements() {
  const [navElements, setnavElements] = useState(navitems);

  const _focus = (id) => {
    let temp = [...navElements];
    temp.map((item) => {
      return item.id === id
        ? (item.class = "navItemFocus")
        : (item.class = "navItem");
    });
    setnavElements(temp);
  };
  const renderItems = navElements.map((element) => {
    return (
      <a href={`#${element.id}`}>
        <li
          key={element.id}
          onClick={() => _focus(element.id)}
          className={`${element.class} p-2`}
        >
          {element.name}
        </li>
      </a>
    );
  });
  const _toggleMenu = () => {
    let nav = Nav.current.className.includes("hide");
    if (nav) {
      Nav.current.className = Nav.current.className.replace("hide", "show");
    } else {
      Nav.current.className = Nav.current.className.replace("show", "hide");
    }
  };

  return (
    <div className="navElements ml-auto">
      <ul className=" list-unstyled">
        <a href={`#`}>
          <li onClick={_toggleMenu} className="menuIcon text-right navItem p-2">
            <i className="fas fa-bars"></i>
          </li>
        </a>
        <div ref={Nav} className="navContainer hide">
          <div ref={elements} className="navElements">
            {renderItems}
          </div>
        </div>
      </ul>
    </div>
  );
}
