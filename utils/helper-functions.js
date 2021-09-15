export function capitalize(name) {
  const arr = name.split(" ");

  const capitalized = arr.map((str) => {
    const firstStr = str[0];
    const caps = str.replace(firstStr, firstStr.toUpperCase());

    return caps;
  });

  return capitalized.join(" ");
}
