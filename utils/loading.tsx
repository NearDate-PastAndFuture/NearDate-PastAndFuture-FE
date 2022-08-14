import Swal from 'sweetalert2';

export async function loading_screen(fn: Function, title: string | null = null) {
  Swal.fire({
    icon: "info",
    title: title || 'NearDate is setup data',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    }
  });
  try {
    await fn();
  } catch (err) {
    console.log(err)
  }
  Swal.close();
}