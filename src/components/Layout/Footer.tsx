

export const Footer = () => {
  return (
    <footer className="py-4 mt-auto container mx-auto text-center">
      <div className="flex flex-row gap-4 justify-center">
        <p>&copy; Made with 🍞 by <b>l1mpan</b><sup>{new Date().getFullYear()}</sup></p>
        <span>|</span>
        <ul className="flex flex-row gap-4">
          <li>gh</li>
          <li>mail</li>
        </ul>
      </div>
    </footer>
  )
}