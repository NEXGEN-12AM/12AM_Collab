const Item: React.FC = () => {
  return (
    <div className="main-container max-w-[1920px] w-full h-auto mx-auto my-10 px-4 md:px-8 lg:px-16">
      {/* SHOP Title */}
      <h2 className="flex justify-center font-humane text-[80px] md:text-[80px] lg:text-[100px] font-normal text-black tracking-[3px] my-4">
        SHOP
      </h2>

      {/* Grid Container - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full px-4">
  {/* Item 1 */}
  <div className="flex justify-center">
    <div className="w-full max-w-[420px] sm:max-w-[450px] md:max-w-[470px] aspect-[3/4] bg-[url('/shop/item-1.png')] bg-cover bg-center bg-no-repeat shadow-lg rounded-lg"></div>
  </div>

  {/* Item 2 */}
  <div className="flex justify-center">
    <div className="w-full max-w-[420px] sm:max-w-[450px] md:max-w-[470px] aspect-[3/4] bg-[url('/shop/item-1.png')] bg-cover bg-center bg-no-repeat shadow-lg rounded-lg"></div>
  </div>

  {/* Item 3 */}
  <div className="flex justify-center">
    <div className="w-full max-w-[420px] sm:max-w-[450px] md:max-w-[470px] aspect-[3/4] bg-[url('/shop/item-1.png')] bg-cover bg-center bg-no-repeat shadow-lg rounded-lg"></div>
  </div>

  {/* Item 4 */}
  <div className="flex justify-center">
    <div className="w-full max-w-[420px] sm:max-w-[450px] md:max-w-[470px] aspect-[3/4] bg-[url('/shop/item-1.png')] bg-cover bg-center bg-no-repeat shadow-lg rounded-lg"></div>
  </div>
</div>
    </div>
  );
};

export default Item;
