const TableDataItem = ({ value, checkedUser, onCheckedUser }) => {
  const handleChange = () => {
    onCheckedUser((pre) => {
      const checked = checkedUser.includes(value.userId);
      if (checked) {
        return checkedUser.filter((userId) => value.userId !== userId);
      } else return [...pre, value.userId];
    });

  };

  return (
    <tr>
      <td className="py-3 pl-4">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
            checked={checkedUser.includes(value.userId)}
            onChange={handleChange}
          />
          <label htmlFor="checkbox" className="sr-only">
            Checkbox
          </label>
        </div>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
        {value.userId}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {value.username}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {value.email}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {value.phoneNumber}
      </td>
      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
        {value.sharksFollowed.length}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
        <a className="text-green-500 hover:text-green-700" href="#">
          Edit
        </a>
      </td>
    </tr>
  );
};

export default TableDataItem;
